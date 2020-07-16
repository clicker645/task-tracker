import { IsString, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

import { passwordMatchRegexp } from '../user.constants';
import { dictionary } from '../../../config/dictionary';

@InputType()
export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  _id: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordMatchRegexp, {
    message: dictionary.errors.passwordMatchError,
  })
  @ApiProperty()
  @Field()
  readonly newPassword: string;

  @ApiProperty()
  @Field()
  readonly oldPassword?: string;
}
