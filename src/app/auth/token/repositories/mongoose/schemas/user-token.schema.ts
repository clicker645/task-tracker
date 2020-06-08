import * as mongoose from 'mongoose';
import { ModelsEnum } from '../../../../../../models/models.enum';

export const TokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: ModelsEnum.USER,
    },
    expireAt: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'tokens',
  },
);

TokenSchema.index({ token: 1, userId: 1 }, { unique: true });
