import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { genderEnum } from '../enums/gender.enum';
import { roleEnum } from '../enums/role.enum';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsEmail()
  readonly email: string;

  @ApiPropertyOptional()
  @IsString()
  readonly login: string;

  @ApiPropertyOptional()
  @IsString()
  @IsEnum(genderEnum)
  readonly gender: string;

  @ApiPropertyOptional({ enum: roleEnum })
  readonly role: string;
}
