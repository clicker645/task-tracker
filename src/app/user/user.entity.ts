import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import pagination from 'mongoose-paginate-v2';
import { Field, ObjectType } from '@nestjs/graphql';

import { userStatusEnum } from './enums/status.enum';
import { userGenderEnum } from './enums/gender.enum';
import { userRoleEnum } from './enums/role.enum';
import { GqlPaginate } from '../../infrastructure/databases/mongoose/pagination/pagination.output';

@ObjectType()
@Schema()
export class User extends Document {
  @Field()
  id: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => userStatusEnum, { defaultValue: userStatusEnum.pending })
  @Prop({
    required: true,
    enum: Object.values(userStatusEnum),
    default: userStatusEnum.pending,
  })
  status: string;

  @Field()
  @Prop({ required: true })
  login: string;

  @Field(() => userGenderEnum)
  @Prop({ required: true, enum: Object.values(userGenderEnum) })
  gender: string;

  @Field(() => userRoleEnum, { defaultValue: userRoleEnum.user })
  @Prop({
    required: true,
    enum: Object.values(userRoleEnum),
    default: userRoleEnum.user,
  })
  role: string;

  @Field()
  @Prop({ required: true })
  password: string;
}

@ObjectType()
export class PaginateUser extends GqlPaginate(User) {}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(pagination);
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.set('timestamps', true);
