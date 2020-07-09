import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

import { userGenderEnum, userRoleEnum } from '../../domain/user.model';

export class UpdateUserRequest {
  @ApiPropertyOptional()
  @IsEmail()
  readonly email: string;

  @ApiPropertyOptional()
  @IsString()
  readonly login: string;

  @ApiPropertyOptional()
  @IsString()
  @IsEnum(userGenderEnum)
  readonly gender: string;

  @ApiPropertyOptional({ enum: userRoleEnum })
  readonly role: string;
}
