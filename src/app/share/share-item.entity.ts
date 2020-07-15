import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import pagination from 'mongoose-paginate-v2';

import { modelsEnum } from '../../models/models.enum';

export enum AccessType {
  Read,
  ReadWrite,
}

@Schema()
export class ShareItem extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: modelsEnum.USER })
  userId: string;

  @Prop({ type: Types.ObjectId, required: true, ref: modelsEnum.ITEM })
  itemId: string;

  @Prop({ type: Number, enum: Object.values(AccessType), required: true })
  accessType: number;
}

export const ShareItemSchema = SchemaFactory.createForClass(ShareItem);

ShareItemSchema.index({ userId: 1, itemId: 1 }, { unique: true });
ShareItemSchema.set('timestamps', true);

ShareItemSchema.plugin(pagination);
