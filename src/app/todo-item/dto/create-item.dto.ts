import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

import { itemStatusEnum } from '../item.entity';
import { Expose } from 'class-transformer';

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
  @ApiPropertyOptional({ enum: itemStatusEnum })
  @IsEnum(itemStatusEnum)
  status: string;

  @Expose()
  userId?: string;

  @Field()
  @ApiProperty()
  expiresAt: Date;
}
