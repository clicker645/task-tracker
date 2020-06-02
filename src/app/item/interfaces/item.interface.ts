import { Document } from 'mongoose';

export interface IItem extends Document {
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly uId: string;
  readonly createAt: Date;
  readonly deadline: Date;
}
