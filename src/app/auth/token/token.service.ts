import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../../infrastructure/databases/redis/redis.service';
import { CreateTokenDto } from './dto/create.token.dto';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { dictionary } from '../../../config/dictionary';
import { trimPrefix } from '../../../common/trim-prefix';
import { CreateTokenResponse } from './responses/create.token.response';
import { bearerPrefix } from './token.constants';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async create(dto: CreateTokenDto): Promise<CreateTokenResponse> {
    const token = this.jwtService.sign(dto);

    const expiresIn = this.configService.get<number>('JWT_TOKEN_LIFETIME');
    const expiresAt = moment()
      .add(expiresIn, 'seconds')
      .toISOString();

    try {
      await this.redisService.set(dto._id, token, expiresIn);
    } catch (e) {
      throw new Error(e);
    }

    return new CreateTokenResponse(token, expiresAt, expiresIn);
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    let success = null;
    try {
      success = await this.redisService.delete(userId);
    } catch (e) {
      throw new Error(e);
    }

    return success;
  }

  async exists(userId: string): Promise<boolean> {
    let exist = null;
    try {
      exist = await this.redisService.exist(userId);
    } catch (e) {
      throw new Error(e);
    }

    return exist;
  }

  async verify(bearerToken: string): Promise<ITokenPayload> {
    let tokenExists = null;

    const token = trimPrefix(bearerToken, bearerPrefix);
    const tokenPayload = await this.jwtService.verify(token);

    try {
      tokenExists = await this.exists(tokenPayload._id);
    } catch (error) {
      throw new Error(error);
    }

    if (!tokenExists) {
      throw new BadRequestException({
        message: dictionary.errors.tokenExpired,
      });
    }

    return tokenPayload;
  }
}
