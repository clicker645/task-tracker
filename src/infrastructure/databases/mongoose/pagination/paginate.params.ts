import mongoose from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class PaginationOptions implements mongoose.PaginateOptions {
  @ApiPropertyOptional()
  @Field({ nullable: true })
  select?: string;

  @ApiPropertyOptional()
  @Field({ nullable: true })
  sort?: string;

  @ApiPropertyOptional()
  @Field({ nullable: true })
  lean?: boolean;

  @ApiPropertyOptional()
  @Field({ nullable: true })
  leanWithId?: boolean;

  @ApiPropertyOptional()
  @Field(type => ID, { nullable: true })
  offset?: number;

  @ApiPropertyOptional()
  @Field(type => ID, { nullable: true })
  page?: number;

  @ApiPropertyOptional()
  @Field(type => ID, { nullable: true })
  limit?: number;

  @ApiPropertyOptional()
  @Field({ nullable: true })
  pagination?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @Field(type => [String], { nullable: true })
  populate?: string[];
}
