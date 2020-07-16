import { registerEnumType } from '@nestjs/graphql';

export enum userStatusEnum {
  pending = 'pending',
  active = 'active',
  blocked = 'blocked',
}

registerEnumType(userStatusEnum, {
  name: 'statuses',
  description: 'statuses are specific status for users in the system',
});
