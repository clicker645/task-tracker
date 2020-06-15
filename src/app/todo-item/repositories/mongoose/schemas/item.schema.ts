import * as pagination from 'mongoose-paginate-v2';
import * as mongoose from 'mongoose';
import { statusEnum } from '../../../enums/status.enum';
import { ModelsEnum } from '../../../../../models/models.enum';

export const ItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(statusEnum),
      default: statusEnum.planned,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: ModelsEnum.USER,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'todoItems',
  },
);

ItemSchema.plugin(pagination);
