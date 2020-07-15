import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class QueryUserDto {
  @ApiPropertyOptional()
  @Expose()
  login: string;

  @ApiPropertyOptional()
  @Expose()
  email: string;
}
