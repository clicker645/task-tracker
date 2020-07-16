import { registerEnumType } from '@nestjs/graphql';

export enum userRoleEnum {
  user = 'user',
  admin = 'admin',
  quest = 'quest',
}

registerEnumType(userRoleEnum, {
  name: 'roles',
  description: 'roles are specific role for any users in the system',
});
