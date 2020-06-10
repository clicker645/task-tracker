import {
  Injectable,
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/app/user/user.service';
import { ActionType, TokenService } from 'src/app/auth/token/token.service';
import { IUser } from 'src/app/user/interfaces/user.interface';
import { statusEnum } from 'src/app/user/enums/status.enum';
import { SignInDto } from './dto/signin.dto';
import { CreateTokenDto } from './token/dto/create.token.dto';
import { ILoginResponse } from './interfaces/login-response.interface';
import { ITokenPayload } from './token/interfaces/token-payload.interface';
import { dictionary } from 'src/config/dictionary';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async login({ email, password }: SignInDto): Promise<ILoginResponse> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status !== statusEnum.active) {
        throw new HttpException(dictionary.errors.verifiedError, 405);
      }

      return <ILoginResponse>{
        userId: user._id,
        role: user.role,
        status: user.status,
        token: await this.tokenService.create(<CreateTokenDto>{
          _id: user._id,
          role: user.role,
          status: user.status,
        }),
      };
    }

    throw new NotFoundException({
      message: dictionary.errors.credentialsError,
    });
  }

  async logout(token: string): Promise<boolean> {
    const data = (await this.tokenService.verify(token)) as ITokenPayload;
    return this.tokenService.deleteByUserId(data._id);
  }

  async confirm(token: string): Promise<IUser> {
    const data = await this.tokenService.verify(token);
    const user = await this.userService.findById(data._id);

    await this.tokenService.deleteByUserId(data._id);

    if (user && user.status === statusEnum.pending) {
      user.status = statusEnum.active;
      return user.save();
    }

    throw new BadRequestException({
      message: dictionary.errors.confirmError,
    });
  }

  async getCurrentUser(token: string): Promise<ITokenPayload> {
    if (token) {
      return this.tokenService.getUserDataFromToken(token);
    }

    throw new Error(dictionary.errors.tokenDoesntExist);
  }

  async sendResetLink(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException({
        message: dictionary.errors.userNotFound,
      });
    }

    return this.tokenService.sendLink(user, ActionType.Reset);
  }
}
