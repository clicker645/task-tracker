import mongoose from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationOptions implements mongoose.PaginateOptions {
  @ApiPropertyOptional()
  select?: Record<string, any> | string;

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

  @ApiPropertyOptional({ type: [String] })
  populate?: string[];
}
