import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';

import { PermissionsExistConstraint } from '../validation/permission.exists';

export class AddPermissionsToRoleDto {
  /**
   * Role is role for users in system. Role includes ONLY permissions.
   * If the role doesn't exist, it will be created
   * @type {string}
   */
  @ApiProperty()
  @IsNotEmpty()
  role: string;

  /**
   * Permissions that already exists in database
   * @type {string[]}
   */
  @ApiProperty()
  @IsNotEmpty()
  @Validate(PermissionsExistConstraint)
  permission: string[];
}
