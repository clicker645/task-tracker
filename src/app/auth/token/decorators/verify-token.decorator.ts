import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { dictionary } from '../../../../config/dictionary';
import { trimPrefix } from '../../../../common/trim-prefix';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

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

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

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
