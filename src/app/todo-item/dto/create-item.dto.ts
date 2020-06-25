import { statusEnum } from '../enums/status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateItemDto {
  @Field()
  @ApiProperty()
  @IsString()
  title: string;

  @Field()
  @ApiProperty()
  @IsString()
  description: string;

  @Field()
  @ApiPropertyOptional({ enum: statusEnum })
  @IsEnum(statusEnum)
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userId?: mongoose.Types.ObjectId;

  @Field()
  @ApiProperty()
  expiresAt: Date;
}
