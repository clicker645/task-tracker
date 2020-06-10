import { IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  _id: string;

  @IsString()
  role: string;

  @IsString()
  status: string;
}
