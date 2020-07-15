import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoginResponse } from '../responses/login.response';
import { ITokenStorage } from '../interfaces/token.storage';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly tokenStorage: ITokenStorage,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ iat, exp, id }) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const loginResponse = (await this.tokenStorage.get(id)) as LoginResponse;
    if (!loginResponse) {
      throw new UnauthorizedException();
    }

    delete loginResponse.user.password;
    return loginResponse.user;
  }
}
