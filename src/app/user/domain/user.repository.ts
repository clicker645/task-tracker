import { User } from './user.model';
import { IBaseRepositoryDDD } from 'src/infrastructure/databases/base.repository.interface';

export interface IUserRepository extends IBaseRepositoryDDD<User> {
  findByEmail(email: string): Promise<User>;
}
