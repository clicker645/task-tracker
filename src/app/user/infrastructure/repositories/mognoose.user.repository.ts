import { PaginateModel } from 'mongoose';

import { BaseRepositoryDDD } from '../../../../infrastructure/databases/mongoose/repository/base.repository';
import { IUserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.model';

export class MongooseUserRepository extends BaseRepositoryDDD<User>
  implements IUserRepository {
  constructor(private readonly userModel: PaginateModel<User>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User> {
    return this.model.findOne({ email });
  }
}
