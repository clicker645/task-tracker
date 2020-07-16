import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Matches,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

import { passwordMatchRegexp } from '../user.constants';
import { dictionary } from '../../../config/dictionary';
import { userGenderEnum } from '../enums/gender.enum';
import { userRoleEnum } from '../enums/role.enum';

@InputType()
export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @Field()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  readonly login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(userGenderEnum)
  @Field(() => userGenderEnum)
  readonly gender: string;

  @ApiPropertyOptional({ enum: userRoleEnum })
  @Field(() => userRoleEnum, { defaultValue: userRoleEnum.user })
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordMatchRegexp, {
    message: dictionary.errors.passwordMatchError,
  })
  @ApiProperty()
  @Field()
  password: string;
}
