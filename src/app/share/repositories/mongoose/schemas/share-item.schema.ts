import * as pagination from 'mongoose-paginate-v2';
import * as mongoose from 'mongoose';
import { AccessType } from '../../../enums/access-type.enum';
import { ModelsEnum } from '../../../../../models/models.enum';

export const ShareItem = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: ModelsEnum.USER,
    },
    itemId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: ModelsEnum.ITEM,
    },
    accessType: {
      type: Number,
      enum: Object.values(AccessType),
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'share',
  },
);

ShareItem.plugin(pagination);
ShareItem.index({ userId: 1, itemId: 1 }, { unique: true });
