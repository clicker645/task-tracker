import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { genderEnum } from '../enums/gender.enum';
import { PaginationOptions } from '../../../components/pagination/paginate.params';

export class QueryUserDto extends PaginationOptions {
  @ApiPropertyOptional()
  @IsEmail()
  readonly email: string;

  @ApiPropertyOptional()
  @IsString()
  readonly login: string;

  @ApiPropertyOptional({ enum: genderEnum })
  @IsString()
  @IsEnum(genderEnum)
  readonly gender: string;
}
