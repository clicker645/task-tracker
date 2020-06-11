import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { CasbinService } from '../app/auth/casbin/casbin.service';
import { TokenService } from '../app/auth/token/token.service';
import { ITokenPayload } from '../app/auth/token/interfaces/token-payload.interface';

@Injectable()
export class CasbinRBACMiddleware implements NestMiddleware {
  constructor(
    private readonly tokenService: TokenService,
    private readonly casbin: CasbinService,
  ) {}

  async use(req, res, next: Function) {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
      const data = (await this.tokenService.verify(
        bearerToken,
      )) as ITokenPayload;

      if (
        !(await this.casbin.checkPermissions(req.url, data.role, req.method))
      ) {
        console.log(req.url, data.role, req.method);
        throw new ForbiddenException();
      }

      next();
    } else {
      throw new UnauthorizedException();
    }
  }
}
