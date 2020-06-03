import * as pagination from 'mongoose-paginate-v2';
import * as mongoose from 'mongoose';
import { statusEnum } from '../../../enums/status.enum';
import { ModelsEnum } from '../../../../../models/models.enum';

export const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(statusEnum),
    default: statusEnum.planned,
  },
  uId: { type: mongoose.Types.ObjectId, required: true, ref: ModelsEnum.USER },
  createAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  deadline: { type: Date, required: true },
});

ItemSchema.plugin(pagination);
