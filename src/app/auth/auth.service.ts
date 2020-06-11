import {
  Injectable,
  BadRequestException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
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
import { Request } from 'express';
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

      return {
        userId: user._id,
        role: user.role,
        status: user.status,
        token: await this.tokenService.create({
          _id: user._id,
          role: user.role,
          status: user.status,
        } as CreateTokenDto),
      } as ILoginResponse;
    }

    throw new NotFoundException({
      message: dictionary.errors.credentialsError,
    });
  }

  async logout(req: Request): Promise<boolean> {
    const currentUser = await this.getUserFromAuthorization(req);
    return this.tokenService.deleteByUserId(currentUser._id);
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

  async getTokenFromReq(req: Request): Promise<string> {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException(dictionary.errors.tokenDoesntExist);
    }

    return token;
  }

  async getCurrentUser(token: string): Promise<ITokenPayload> {
    return this.tokenService.verify(token);
  }

  async getUserFromAuthorization(req: Request): Promise<ITokenPayload> {
    const token = await this.getTokenFromReq(req);
    return this.getCurrentUser(token);
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
