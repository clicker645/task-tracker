import { Document } from 'mongoose';
import { IUser } from '../../../../../app/user/interfaces/user.interface';

export interface IDocumentHistory extends Document {
  user: IUser;
  target: string;
  from: string;
  to: string;
  changeDate: Date;
  document: string;
  modelName: string;
}
