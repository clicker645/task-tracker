import mongoose from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ArgsType()
export class PaginationOptions implements mongoose.PaginateOptions {
  @ApiPropertyOptional()
  @Field({ nullable: true })
  @Expose()
  select?: string;

  @ApiPropertyOptional()
  @Field({ nullable: true })
  @Expose()
  sort?: string;

  @ApiPropertyOptional()
  @Field({ nullable: true })
  @Expose()
  lean?: boolean;

  @ApiPropertyOptional()
  @Field({ nullable: true })
  @Expose()
  leanWithId?: boolean;

  @ApiPropertyOptional()
  @Field(() => Int, { nullable: true })
  @Expose()
  offset?: number;

  @ApiPropertyOptional()
  @Field(() => Int, { nullable: true })
  @Expose()
  page?: number;

  @ApiPropertyOptional()
  @Field(() => Int, { nullable: true })
  @Expose()
  limit?: number;

  @ApiPropertyOptional()
  @Field({ nullable: true })
  @Expose()
  pagination?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @Field(() => [String], { nullable: 'itemsAndList' })
  @Expose()
  populate?: string[];
}
