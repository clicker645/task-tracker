import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { IUserToken } from './interfaces/user-token.interface';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { SignOptions } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../user/interfaces/user.interface';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../../../infrastructure/mail/mail.service';
import { TokenRepository } from './repositories/mongoose/token.repository';
@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  async create(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
    return await this.tokenRepository.create(createUserTokenDto);
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

  async deleteByUserId(uId: string): Promise<{ ok?: number; n?: number }> {
    return await this.tokenRepository.deleteByUserId(uId);
  }

  async exists(uId: string, token: string): Promise<boolean> {
    return await this.tokenRepository.exists(uId, token);
  }

  public async verify(token): Promise<any> {
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

  async sendConfirmation(user: IUser) {
    const expiresIn = 60 * 60 * 24; // 24 hours
    const tokenPayload = {
      _id: user._id,
      status: user.status,
      role: user.role,
    };
    const expireAt = moment()
      .add(1, 'day')
      .toISOString();

    const token = await this.generate(tokenPayload, { expiresIn });
    const confirmLink = `${this.configService.get<string>(
      'FE_APP_URL',
    )}/auth/confirm?token=${token}`;

    await this.create({ token, uId: user._id, expireAt });
    await this.mailService.send({
      from: this.configService.get<string>('ADMIN_MAIL'),
      to: user.email,
      subject: 'Verify User',
      html: `
                <h3>Hello ${user.login}!</h3>
                <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
            `,
    });

    Logger.log(confirmLink);
  }
}
