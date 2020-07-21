import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NestCasbinService } from 'nestjs-casbin-mongodb';
import { ExtractJwt } from 'passport-jwt';

import { AuthService } from '../app/auth/auth.service';

@Injectable()
export class CasbinRBACMiddleware implements NestMiddleware {
  constructor(
    private readonly casbinService: NestCasbinService,
    private readonly authService: AuthService,
  ) {}

  async use(req, res, next: Function) {
    const payload = await this.authService.verify(
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      req,
    );

    const hasPermission = await this.casbinService.enforce(
      payload.id,
      req.path,
      req.method,
    );

    if (!hasPermission) {
      throw new ForbiddenException();
    }

    next();
  }
}
