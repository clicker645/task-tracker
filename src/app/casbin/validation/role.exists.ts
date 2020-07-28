import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { NestCasbinService } from 'nestjs-casbin-mongodb';

@ValidatorConstraint({ async: true })
@Injectable()
export class RolesExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly casbin: NestCasbinService) {}

  private wrongRole: string;

  async validate(targetRoles: string[]) {
    const roles = await this.casbin.getAllRoles();
    let notExist = false;
    targetRoles.forEach(targetRole => {
      if (!roles.includes(targetRole)) {
        notExist = true;
        this.wrongRole = targetRole;
      }
    });

    return !notExist;
  }

  defaultMessage(): string {
    return `Error: role ${this.wrongRole} does not exist in the database`;
  }
}
