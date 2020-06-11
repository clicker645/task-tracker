import { statusEnum } from '../enums/status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ enum: statusEnum })
  @IsEnum(statusEnum)
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userId?: mongoose.Types.ObjectId;

  @ApiProperty()
  @IsDateString()
  expiresAt: Date;
}
