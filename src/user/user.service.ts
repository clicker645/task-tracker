import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { IUser } from './interfaces/user.interface';
import { PaginateModel, PaginateResult } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(@InjectModel('User') private userModel: PaginateModel<IUser>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async create(
    createUserDto: CreateUserDto,
    roles: Array<string>,
  ): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const createdUser = new this.userModel(
      _.assignIn(createUserDto, { password: hash, roles }),
    );
    return createdUser.save();
  }

  async find(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(_id: string, payload: Partial<IUser>) {
    return this.userModel.updateOne({ _id }, payload);
  }

  async delete(_id: string): Promise<any> {
    return this.userModel.deleteOne({ _id });
  }

  async getAll(): Promise<PaginateResult<IUser>> {
    return await this.userModel.paginate(
      {},
      {
        page: 1,
        limit: 1,
      },
    );
  }
}
