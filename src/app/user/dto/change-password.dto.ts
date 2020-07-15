import { IsString, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { passwordMatchRegexp } from '../user.constants';
import { dictionary } from '../../../config/dictionary';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordMatchRegexp, {
    message: dictionary.errors.passwordMatchError,
  })
  @ApiProperty()
  readonly newPassword: string;

  @ApiProperty()
  readonly oldPassword?: string;
}
