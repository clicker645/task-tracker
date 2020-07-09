import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import pagination from 'mongoose-paginate-v2';

export enum userStatusEnum {
  pending = 'pending',
  active = 'active',
  blocked = 'blocked',
}

export enum userGenderEnum {
  male = 'male',
  female = 'female',
}

export enum userRoleEnum {
  user = 'user',
  admin = 'admin',
  quest = 'quest',
}

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
    enum: Object.values(userStatusEnum),
    default: userStatusEnum.pending,
  })
  status: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true, enum: Object.values(userGenderEnum) })
  gender: string;

  @Prop({
    required: true,
    enum: Object.values(userRoleEnum),
    default: userRoleEnum.user,
  })
  role: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(pagination);
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.set('timestamps', true);
