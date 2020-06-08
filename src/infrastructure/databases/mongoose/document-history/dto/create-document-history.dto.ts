import * as mongoose from 'mongoose';

export class DocumentHistoryDto {
  user: mongoose.Types.ObjectId;
  target: string;
  from: string;
  to: string;
  document: mongoose.Types.ObjectId;
  modelName: string;
}
