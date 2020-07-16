import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginDto {
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @Field()
  email: string;

  @ApiProperty({
    required: true,
  })
  @Field()
  password: string;
}
