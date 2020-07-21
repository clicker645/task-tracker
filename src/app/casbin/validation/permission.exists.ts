import {
  ValidationArguments,
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

  async validate(targetPermissions: string[], args: ValidationArguments) {
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

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Error: permission ${this.wrongPermission} does not exist in the database`;
  }
}
