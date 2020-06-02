import * as pagination from 'mongoose-paginate-v2';
import * as mongoose from 'mongoose';
import { AccessType } from '../enums/access-type.enum';

export const ShareItem = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  itemId: { type: mongoose.Types.ObjectId, required: true, ref: 'Item' },
  accessType: { type: Number, enum: Object.values(AccessType), required: true },
});

ShareItem.plugin(pagination);
ShareItem.index({ userId: 1, itemId: 1 }, { unique: true });
