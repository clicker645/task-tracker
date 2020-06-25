import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Matches,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { genderEnum } from '../enums/gender.enum';
import { roleEnum } from '../enums/role.enum';
import { passwordMatchRegexp } from '../user.constants';
import { dictionary } from '../../../config/dictionary';

export class CreateUserDto {
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
  @IsEnum(genderEnum)
  readonly gender: string;

  @ApiPropertyOptional({ enum: roleEnum })
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordMatchRegexp, {
    message: dictionary.errors.passwordMatchError,
  })
  @ApiProperty()
  password: string;
}
