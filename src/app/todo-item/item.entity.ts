import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import pagination from 'mongoose-paginate-v2';

import { UserSchema } from '../user/user.entity';
import { modelsEnum } from '../../models/models.enum';

export enum itemStatusEnum {
  planned = 'Planned',
  inProgress = 'In Progress',
  done = 'Done',
}

@Schema()
export class Item extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: String,
    enum: Object.values(itemStatusEnum),
    default: itemStatusEnum.planned,
  })
  status: string;

  @Prop({ type: Types.ObjectId, required: true, ref: modelsEnum.USER })
  userId: string;

  @Prop({ type: Date, required: true })
  expiresAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
UserSchema.set('timestamps', true);

ItemSchema.plugin(pagination);
