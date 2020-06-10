import { IToken } from '../token/interfaces/token.interface';

export interface ILoginResponse {
  userId: string;
  role: string;
  status: string;
  token: IToken;
}
