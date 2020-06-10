import { Injectable } from '@nestjs/common';
import { newEnforcer, Enforcer } from 'casbin';
import { join } from 'path';

@Injectable()
export class CasbinService {
  private enforcer: Enforcer;

  constructor() {
    newEnforcer(
      join(__dirname, '../../../../rbac_model.conf'),
      join(__dirname, '../../../../rbac_policy.csv'),
    ).then(e => {
      this.enforcer = e;
    });
  }

  async checkPermissions(
    url: string,
    role: string,
    method: string,
  ): Promise<boolean> {
    return await this.enforcer.enforce(role, url, method);
  }
}
