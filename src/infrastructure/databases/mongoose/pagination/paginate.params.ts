import mongoose from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArgsType, Field, ID } from '@nestjs/graphql';
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
  @Field(type => ID, { nullable: true })
  @Expose()
  offset?: number;

  @ApiPropertyOptional()
  @Field(type => ID, { nullable: true })
  @Expose()
  page?: number;

  @ApiPropertyOptional()
  @Field(type => ID, { nullable: true })
  @Expose()
  limit?: number;

  @ApiPropertyOptional()
  @Field({ nullable: true })
  @Expose()
  pagination?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @Field(type => [String], { nullable: true })
  @Expose()
  populate?: string[];
}
