import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { NestCasbinService } from 'nestjs-casbin-mongodb';

@ValidatorConstraint({ async: true })
@Injectable()
export class PermissionsExistConstraint
  implements ValidatorConstraintInterface {
  constructor(private readonly casbin: NestCasbinService) {}

  private wrongPermission: string;

  async validate(targetPermissions: string[]) {
    const permissions = await this.casbin.getAllSubjects();
    let notExist = false;
    targetPermissions.forEach(targetPermission => {
      if (!permissions.includes(targetPermission)) {
        notExist = true;
        this.wrongPermission = targetPermission;
      }
    });

    return !notExist;
  }

  defaultMessage(): string {
    return `Error: permission ${this.wrongPermission} does not exist in the database`;
  }
}
