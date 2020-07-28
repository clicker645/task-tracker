import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArgsType, Field } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ArgsType()
export class QueryUserDto {
  @ApiPropertyOptional()
  @Expose()
  @Field({ nullable: true })
  login: string;

  @ApiPropertyOptional()
  @Expose()
  @Field({ nullable: true })
  email: string;
}
