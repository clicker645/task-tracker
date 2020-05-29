export interface IReadableUser {
  readonly email: string;
  status: string;
  readonly login: string;
  readonly gender: string;
  readonly role: string;
  accessToken?: string;
}
