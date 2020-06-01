import { Injectable, Logger } from '@nestjs/common';
import { newEnforcer, Enforcer, Adapter } from 'casbin';
import { join } from 'path';

@Injectable()
export class CasbinService {
  private enforcer: Enforcer;

  // TODO Migrate RBAC_POLICY to mongodb use mongoose
  constructor() {
    newEnforcer(
      join(__dirname, '../../../rbac_model.conf'),
      join(__dirname, '../../../rbac_policy.csv'),
    ).then(e => {
      this.enforcer = e;
    });
  }

  async checkPermissions(
    url: string,
    role: string,
    method: string,
  ): Promise<boolean> {
    console.log(role, url, method);
    return await this.enforcer.enforce(role, url, method);
  }
}
