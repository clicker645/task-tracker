import { BaseRepository } from '../../../../components/repository/base.repository';
import { IUser } from '../../interfaces/user.interface';
import { CreateUserDto } from '../../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { IUserRepository } from '../user.repository.interface';

@Injectable()
export class UserRepository extends BaseRepository<IUser, CreateUserDto>
  implements IUserRepository {
  constructor(@InjectModel('User') private userModel: PaginateModel<IUser>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email });
  }
}
