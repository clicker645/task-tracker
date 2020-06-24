import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../user/interfaces/user.interface';
import moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../../../infrastructure/mail/mail.service';
import { RedisService } from '../../../infrastructure/databases/redis/redis.service';
import { ResetPasswordTemplate } from '../../../infrastructure/mail/templates/reset-password.template';
import { ConfirmTemplate } from '../../../infrastructure/mail/templates/confirm.template';
import { CreateTokenDto } from './dto/create.token.dto';
import { IToken } from './interfaces/token.interface';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { dictionary } from '../../../config/dictionary';
import { trimPrefix } from '../../../common/trim-prefix';

export const ActionType = {
  Reset: {
    subject: 'Reset Password',
    path: `${process.env.PATH_TO_RESET_PASS_PAGE}?token=`,
    html: ResetPasswordTemplate,
  } as Action,
  Confirm: {
    subject: 'Verify User',
    path: '/auth/confirm?token=',
    html: ConfirmTemplate,
  } as Action,
};

declare type Action = {
  subject: string;
  path: string;
  html: (login: string, confirmLink: string) => string;
};

const bearerPrefix = 'Bearer ';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async create(dto: CreateTokenDto): Promise<IToken> {
    const token = this.jwtService.sign(dto);

    const expiresIn = this.configService.get<number>('JWT_TOKEN_LIFETIME');
    const expiresAt = moment()
      .add(expiresIn, 'seconds')
      .toISOString();

    if (await this.redisService.set(dto._id, token, expiresIn)) {
      return {
        jwt: token,
        expiresAt: expiresAt,
        expiresIn: expiresIn,
      } as IToken;
    }
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    try {
      if (await this.redisService.delete(userId)) {
        return true;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async exists(userId: string): Promise<boolean> {
    return await this.redisService.exist(userId);
  }

  async verify(bearerToken: string): Promise<ITokenPayload> {
    try {
      const token = trimPrefix(bearerToken, bearerPrefix);
      const data = (await this.jwtService.verify(token)) as ITokenPayload;
      const tokenExists = await this.exists(data._id);

      if (!tokenExists) {
        throw new BadRequestException({
          message: dictionary.errors.tokenExpired,
        });
      }

      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async sendLink(user: IUser, action: Action): Promise<boolean> {
    const token = await this.create({
      _id: user._id,
      role: user.role,
      status: user.status,
    } as CreateTokenDto);

    const confirmLink = `${this.configService.get<string>('FE_APP_URL')}${
      action.path
    }${token.jwt}`;

    await this.mailService.send({
      from: this.configService.get<string>('ADMIN_MAIL'),
      to: user.email,
      subject: action.subject,
      html: action.html(user.login, confirmLink),
    });

    return true;
  }
}
