import { User } from '../../../user/domain/user.model';

export class LoginResponse {
  expiresIn: number;
  jwt: string;
  user: User;

  constructor(expiresIn: number, jwt: string, user: User) {
    this.expiresIn = expiresIn;
    this.jwt = jwt;
    this.user = user;
  }
}
