import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserToken } from './interfaces/user-token.interface';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { SignOptions } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../user/interfaces/user.interface';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../../../infrastructure/mail/mail.service';
import { RedisService } from '../../../infrastructure/databases/redis/redis.service';
import { ResetPasswordTemplate } from '../../../infrastructure/mail/templates/reset-password.template';
import { ConfirmTemplate } from '../../../infrastructure/mail/templates/confirm.template';

export const ActionType = {
  Reset: <Action>{
    subject: 'Reset Password',
    path: '/auth/reset?token=',
    html: ResetPasswordTemplate,
  },
  Confirm: <Action>{
    subject: 'Verify User',
    path: '/auth/confirm?token=',
    html: ConfirmTemplate,
  },
};

declare type Action = {
  subject: string;
  path: string;
  html: (login: string, confirmLink: string) => string;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async create(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
    const ok = await this.redisService.set(
      createUserTokenDto.userId.toString(),
      createUserTokenDto,
      this.configService.get<number>('JWT_TOKEN_LIFETIME'),
    );

    if (ok) {
      return <IUserToken>{
        token: createUserTokenDto.token,
        userId: createUserTokenDto.userId.toString(),
        expireAt: createUserTokenDto.expireAt,
        createdAt: Date.now().toString(),
      };
    }
  }

  async generate(data: ITokenPayload, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  async getUserDataFromToken(token: string): Promise<ITokenPayload> {
    try {
      return (await this.jwtService.verify(token)) as ITokenPayload;
    } catch (e) {
      throw new Error('Error: wrong access token');
    }
  }

  async deleteByUserId(userId: string): Promise<{ ok?: number; n?: number }> {
    try {
      if (await this.redisService.delete(userId)) {
        return {
          ok: 1,
        };
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async exists(userId: string, token: string): Promise<boolean> {
    return await this.redisService.exist(userId);
  }

  public async verify(token: string): Promise<ITokenPayload> {
    try {
      const data = this.jwtService.verify(token) as ITokenPayload;
      const tokenExists = await this.exists(data._id, token);

      if (tokenExists) {
        return data;
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async sendLink(user: IUser, action: Action): Promise<boolean> {
    const tokenPayload = {
      _id: user._id,
      status: user.status,
      role: user.role,
    };
    const expireAt = moment()
      .add(this.configService.get<number>('JWT_TOKEN_LIFETIME'), 'seconds')
      .toISOString();

    const token = await this.generate(tokenPayload, {
      expiresIn: this.configService.get<number>('JWT_TOKEN_LIFETIME'),
    });
    const confirmLink = `${this.configService.get<string>('FE_APP_URL')}${
      action.path
    }${token}`;

    await this.create({ token, userId: user._id, expireAt });
    await this.mailService.send({
      from: this.configService.get<string>('ADMIN_MAIL'),
      to: user.email,
      subject: action.subject,
      html: action.html(user.login, confirmLink),
    });

    return true;
  }
}
