import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';

import { RolesExistConstraint } from '../validation/role.exists';
import { UserExistConstraint } from '../../user/validation/user.exists';

export class AddRolesToUserDto {
  /**
   * user must be useШid that already exists in the system
   * @type {string}
   */
  @ApiProperty()
  @Validate(UserExistConstraint)
  user: string;

  /**
   * roles that already exist in the system
   * @type {string[]}
   */
  @ApiProperty()
  @Validate(RolesExistConstraint)
  roles: string[];
}
