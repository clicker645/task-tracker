import { RolesExistConstraint } from './validation/role.exists';
import { PermissionsExistConstraint } from './validation/permission.exists';
import { UserExistConstraint } from '../user/validation/user.exists';

export const casbinValidationProviders = [
  RolesExistConstraint,
  PermissionsExistConstraint,
  UserExistConstraint,
];
