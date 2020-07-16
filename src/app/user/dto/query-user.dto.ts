import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ArgsType, Field } from '@nestjs/graphql';

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
