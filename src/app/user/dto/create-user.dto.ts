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
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  @ApiProperty()
  password: string;
}
