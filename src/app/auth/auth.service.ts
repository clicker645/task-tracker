import {
  Injectable,
  BadRequestException,
  NotFoundException,
  MethodNotAllowedException,
  InternalServerErrorException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UserService } from 'src/app/user/user.service';
import { TokenService } from 'src/app/auth/token/token.service';
import { IUser } from 'src/app/user/interfaces/user.interface';
import { statusEnum } from 'src/app/user/enums/status.enum';
import { SignInDto } from './dto/signin.dto';
import { dictionary } from 'src/config/dictionary';
import { LoginResponse } from './responses/login.response';
import { ConfirmService, MessageType } from '../confirm/confirm.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly confirmService: ConfirmService,
  ) {}

  async login({ email, password }: SignInDto): Promise<LoginResponse> {
    const user = await this.userService.findByEmail(email);
    const passwordsIsCompare = await bcrypt.compare(password, user.password);

    if (user && passwordsIsCompare) {
      if (user.status !== statusEnum.active) {
        throw new MethodNotAllowedException(dictionary.errors.verifiedError);
      }

      const token = await this.tokenService.create({
        _id: user._id,
        role: user.role,
        status: user.status,
      });

      const loginResponse = new LoginResponse();
      return loginResponse.factory(user, token);
    }

    throw new BadRequestException({
      message: dictionary.errors.credentialsError,
    });
  }

  async logout(_id: string): Promise<boolean> {
    try {
      return this.tokenService.deleteByUserId(_id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
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

  async sendResetLink(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException({
        message: dictionary.errors.userNotFound,
      });
    }

    return this.confirmService.send(user, MessageType.Reset);
  }
}
