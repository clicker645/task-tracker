import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

import { itemStatusEnum } from '../item.entity';

export class UpdateItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiPropertyOptional({ enum: itemStatusEnum })
  @IsOptional()
  @IsEnum(itemStatusEnum)
  readonly status: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly expiresAt: Date;
}
