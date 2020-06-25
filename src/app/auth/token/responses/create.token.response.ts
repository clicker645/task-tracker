export class CreateTokenResponse {
  jwt: string;
  expiresAt: string;
  expiresIn: number;

  constructor(token: string, expiresAt: string, expiresIn: number) {
    this.jwt = token;
    this.expiresAt = expiresAt;
    this.expiresIn = expiresIn;
  }
}
