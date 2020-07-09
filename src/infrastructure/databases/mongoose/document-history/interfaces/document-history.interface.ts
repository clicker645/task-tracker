import { Document } from 'mongoose';
import { User } from '../../../../../app/user/domain/user.model';

export interface IDocumentHistory extends Document {
  user: User;
  target: string;
  from: string;
  to: string;
  createdAt: Date;
  document: string;
  modelName: string;
}
