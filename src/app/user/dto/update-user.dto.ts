import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

import { userGenderEnum } from '../enums/gender.enum';
import { userRoleEnum } from '../enums/role.enum';

@InputType()
export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsEmail()
  @Field()
  readonly email: string;

  @ApiPropertyOptional()
  @IsString()
  @Field()
  readonly login: string;

  @ApiPropertyOptional()
  @IsString()
  @IsEnum(userGenderEnum)
  @Field(type => userGenderEnum)
  readonly gender: string;

  @ApiPropertyOptional({ enum: userRoleEnum })
  @Field(type => userRoleEnum, { defaultValue: userRoleEnum.user })
  readonly role: string;
}
