import * as mongoose from 'mongoose';
import * as pagination from 'mongoose-paginate-v2';
import {
  getModelsArray,
  ModelsEnum,
} from '../../../../../../../models/models.enum';

export const DocumentHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: ModelsEnum.USER },
  target: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  changeDate: { type: Date, required: true },

  document: {
    type: mongoose.Types.ObjectId,
    required: true,
    refPath: 'modelName',
  },
  modelName: {
    type: String,
    required: true,
    enum: getModelsArray(),
  },
});

DocumentHistorySchema.plugin(pagination);
