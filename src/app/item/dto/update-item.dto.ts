import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { statusEnum } from '../enums/status.enum';

export class UpdateItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiPropertyOptional({ enum: statusEnum })
  @IsOptional()
  @IsEnum(statusEnum)
  readonly status: string;
}
