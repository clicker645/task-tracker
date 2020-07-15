import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';

import { itemStatusEnum } from '../item.entity';

export class QueryItemDto {
  @ApiPropertyOptional()
  @Expose()
  title?: string;

  @ApiPropertyOptional()
  @Expose()
  description?: string;

  @ApiPropertyOptional()
  @IsEnum(itemStatusEnum)
  @Expose()
  status: string;
}
