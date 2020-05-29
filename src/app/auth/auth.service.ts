import {
  Injectable,
  BadRequestException,
  MethodNotAllowedException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as moment from 'moment';

import { UserService } from 'src/app/user/user.service';
import { TokenService } from 'src/components/token/token.service';
import { IUser } from 'src/app/user/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import { statusEnum } from 'src/app/user/enums/status.enum';
import { SignInDto } from './dto/signin.dto';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { IReadableUser } from 'src/app/user/interfaces/readable-user.interface';
import { userSensitiveFieldsEnum } from 'src/app/user/enums/protected-fields.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async login({ email, password }: SignInDto): Promise<IReadableUser> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status !== statusEnum.active) {
        throw new MethodNotAllowedException();
      }
      const tokenPayload: ITokenPayload = {
        _id: user._id,
        status: user.status,
        role: user.role,
      };
      const token = await this.tokenService.generate(tokenPayload);
      const expireAt = moment()
        .add(1, 'day')
        .toISOString();

      await this.tokenService.create({
        token,
        expireAt,
        uId: user._id,
      });

      const readableUser = user.toObject() as IReadableUser;
      readableUser.accessToken = token;

      return _.omit<any>(
        readableUser,
        Object.values(userSensitiveFieldsEnum),
      ) as IReadableUser;
    }
    throw new BadRequestException('Invalid credentials');
  }

  async logout(token: string): Promise<{ ok?: number; n?: number }> {
    const data = (await this.tokenService.verify(token)) as ITokenPayload;
    return this.tokenService.delete(data._id);
  }

  async confirm(token: string): Promise<IUser> {
    const data = await this.tokenService.verify(token);
    const user = await this.userService.find(data._id);

    await this.tokenService.delete(data._id);

    if (user && user.status === statusEnum.pending) {
      user.status = statusEnum.active;
      return user.save();
    }
    throw new BadRequestException('Confirmation error');
  }
}
