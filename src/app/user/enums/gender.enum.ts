import { registerEnumType } from '@nestjs/graphql';

export enum userGenderEnum {
  male = 'male',
  female = 'female',
}

registerEnumType(userGenderEnum, {
  name: 'gender',
  description: 'gender for users in the system',
});
