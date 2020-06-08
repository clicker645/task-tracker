import * as mongoose from 'mongoose';
import { genderEnum } from '../../../enums/gender.enum';
import { roleEnum } from '../../../enums/role.enum';
import { statusEnum } from '../../../enums/status.enum';
import * as pagination from 'mongoose-paginate-v2';

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(statusEnum),
      default: statusEnum.pending,
    },
    login: { type: String, required: true },
    gender: { type: String, required: true, enum: Object.values(genderEnum) },
    role: { type: String, required: true, enum: Object.values(roleEnum) },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

UserSchema.plugin(pagination);
UserSchema.index({ email: 1 }, { unique: true });
