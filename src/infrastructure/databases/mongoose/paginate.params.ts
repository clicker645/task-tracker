import * as mongoose from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationOptions implements mongoose.PaginateOptions {
  @ApiPropertyOptional()
  select?: string;

  @ApiPropertyOptional()
  sort?: string;

  @ApiPropertyOptional()
  lean?: boolean;

  @ApiPropertyOptional()
  leanWithId?: boolean;

  @ApiPropertyOptional()
  offset?: number;

  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  pagination?: boolean;

  @ApiPropertyOptional()
  populate?: Object[] | string[] | Object;
}
