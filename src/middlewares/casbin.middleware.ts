import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ITokenPayload } from '../app/auth/interfaces/token-payload.interface';
import { CasbinService } from '../app/auth/casbin/casbin.service';
import { TokenService } from '../app/auth/token/token.service';

@Injectable()
export class CasbinRBACMiddleware implements NestMiddleware {
  constructor(
    private readonly tokenService: TokenService,
    private readonly casbin: CasbinService,
  ) {}

  async use(req, res, next: Function) {
    next();
    const token = req.headers.authorization;
    if (token) {
      const data = (await this.tokenService.verify(token)) as ITokenPayload;

      if (
        !(await this.casbin.checkPermissions(req.url, data.role, req.method))
      ) {
        throw new ForbiddenException();
      }

      next();
    } else {
      throw new UnauthorizedException();
    }
  }
}
