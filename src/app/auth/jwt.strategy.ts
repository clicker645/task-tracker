import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/app/user/interfaces/user.interface';
import { TokenService } from 'src/app/auth/token/token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req, user: Partial<IUser>) {
    const token = req.headers.authorization.slice(7);
    const tokenExists = await this.tokenService.exists(user._id);
    if (tokenExists) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
