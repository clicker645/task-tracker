import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { dictionary } from '../../../../config/dictionary';
import { trimPrefix } from '../../../../common/trim-prefix';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { GqlExecutionContext } from '@nestjs/graphql';
import { bearerPrefix } from '../token.constants';

const jwt = new JwtService({
  secret: 'SomeKey',
  signOptions: { expiresIn: '1d' },
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

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const bearerToken = request.headers.authorization;
    if (!bearerToken) {
      throw new UnauthorizedException(dictionary.errors.tokenDoesntExist);
    }

    const token = trimPrefix(bearerToken, bearerPrefix);
    return jwt.verify(token) as ITokenPayload;
  },
);
