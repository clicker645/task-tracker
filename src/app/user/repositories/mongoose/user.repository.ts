import { BaseRepository } from '../../../../infrastructure/databases/mongoose/repository/base.repository';
import { IUser } from '../../interfaces/user.interface';
import { CreateUserDto } from '../../dto/create-user.dto';
import { PaginateModel } from 'mongoose';
import { IUserRepository } from '../user.repository.interface';

export class UserRepository extends BaseRepository<IUser, CreateUserDto>
  implements IUserRepository {
  constructor(private userModel: PaginateModel<IUser>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email });
  }
}
