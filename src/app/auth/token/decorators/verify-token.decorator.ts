import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { dictionary } from '../../../../config/dictionary';
import { trimPrefix } from '../../../../common/trim-prefix';
import { ITokenPayload } from '../interfaces/token-payload.interface';

const bearerPrefix = 'Bearer ';
const jwt = new JwtService({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_TOKEN_LIFETIME },
});

export const VerifyToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;
    if (!bearerToken) {
      throw new UnauthorizedException(dictionary.errors.tokenDoesntExist);
    }

    const token = trimPrefix(bearerToken, bearerPrefix);
    return jwt.verify(token) as ITokenPayload;
  },
);
