import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: string;
}
