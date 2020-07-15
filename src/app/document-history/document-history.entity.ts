import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import pagination from 'mongoose-paginate-v2';
import { modelsEnum } from '../../models/models.enum';

@Schema()
export class DocumentHistory extends Document {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: modelsEnum.USER,
  })
  user: string;

  @Prop({ type: String, required: true })
  target: string;

  @Prop({ type: String, required: true })
  from: string;

  @Prop({ type: String, required: true })
  to: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    refPath: 'modelName',
  })
  document: string;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(modelsEnum),
  })
  modelName: string;
}

export const DocumentHistorySchema = SchemaFactory.createForClass(
  DocumentHistory,
);

DocumentHistorySchema.plugin(pagination);
DocumentHistorySchema.set('timestamps', { createdAt: true, updatedAt: false });
