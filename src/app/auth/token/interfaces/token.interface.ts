import { Document } from 'mongoose';

export interface IToken extends Document {
  jwt: string;
  expiresAt: string;
  expiresIn: number;
}
