import { Document } from 'mongoose';

export interface IShareItem extends Document {
  readonly userId: string;
  readonly itemId: string;
  readonly accessType: number;
}
