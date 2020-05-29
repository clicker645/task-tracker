import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly email: string;
  status: string;
  readonly login: string;
  readonly gender: string;
  readonly role: string;
  readonly password: string;
}
