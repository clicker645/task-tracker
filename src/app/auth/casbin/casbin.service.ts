import { Injectable } from '@nestjs/common';
import { newEnforcer, Enforcer } from 'casbin';
import { join } from 'path';

const pathToRBACModel = '../../../../rbac_model.conf';
const pathToRBACPolicy = '../../../../rbac_policy.csv';

@Injectable()
export class CasbinService {
  private enforcer: Enforcer;

  constructor() {
    newEnforcer(
      join(__dirname, pathToRBACModel),
      join(__dirname, pathToRBACPolicy),
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
