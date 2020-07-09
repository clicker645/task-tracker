import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Matches,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { passwordMatchRegexp } from '../user.constants';
import { dictionary } from '../../../../config/dictionary';
import { userGenderEnum, userRoleEnum } from '../../domain/user.model';

export class CreateUserRequest {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(userGenderEnum)
  readonly gender: string;

  @ApiPropertyOptional({ enum: userRoleEnum })
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordMatchRegexp, {
    message: dictionary.errors.passwordMatchError,
  })
  @ApiProperty()
  password: string;
}
