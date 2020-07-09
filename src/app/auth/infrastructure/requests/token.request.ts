import { IsNotEmpty } from "class-validator";

export class TokenRequest {
  @IsNotEmpty()
  id: string;
  
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: string;
}
