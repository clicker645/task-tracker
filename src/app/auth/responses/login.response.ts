import { IUser } from '../../user/interfaces/user.interface';
import { CreateTokenResponse } from '../token/responses/create.token.response';

export class LoginResponse {
  private userId: string;
  private role: string;
  private status: string;
  private token: CreateTokenResponse;

  factory(user: IUser, token: CreateTokenResponse): LoginResponse {
    this.userId = user._id;
    this.role = user.role;
    this.status = user.status;
    this.token = token;

    return this;
  }
}
