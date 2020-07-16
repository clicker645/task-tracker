import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

import { passwordMatchRegexp } from '../user.constants';
import { dictionary } from '../../../config/dictionary';

@InputType()
export class ResetPasswordDto {
  @ApiProperty()
  @Field()
  token: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordMatchRegexp, {
    message: dictionary.errors.passwordMatchError,
  })
  @ApiProperty()
  @Field()
  readonly password: string;
}
