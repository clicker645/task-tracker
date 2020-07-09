import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

import { passwordMatchRegexp } from '../user.constants';
import { dictionary } from '../../../../config/dictionary';

export class ResetPasswordRequest {
  @ApiProperty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordMatchRegexp, {
    message: dictionary.errors.passwordMatchError,
  })
  @ApiProperty()
  readonly password: string;
}
