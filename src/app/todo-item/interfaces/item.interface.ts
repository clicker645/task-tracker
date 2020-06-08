import { Document } from 'mongoose';

export interface IItem extends Document {
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly userId: string;
  readonly createAt: Date;
  readonly expiresAt: Date;
  readonly updatedAt: Date;
}
