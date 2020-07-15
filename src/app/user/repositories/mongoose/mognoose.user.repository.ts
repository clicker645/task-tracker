import { PaginateModel } from 'mongoose';

import { BaseRepository } from '../../../../infrastructure/databases/mongoose/repository/base.repository';
import { IUserRepository } from '../user-repository.interface';
import { User } from '../../user.entity';

export class MongooseUserRepository extends BaseRepository<User>
  implements IUserRepository {
  constructor(private readonly userModel: PaginateModel<User>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User> {
    return this.model.findOne({ email });
  }
}
