import * as pagination from 'mongoose-paginate-v2';
import * as mongoose from 'mongoose';
import { statusEnum } from '../enums/status.enum';
import * as diffHistory from 'mongoose-diff-history/diffHistory';
import { Logger } from '@nestjs/common';

export const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(statusEnum),
    default: statusEnum.planned,
  },
  uId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  createAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  deadline: { type: Date, required: true },
  changeHistory: { type: Array },
});

ItemSchema.plugin(pagination);
