import { User } from '../user.entity';
import { IBaseRepository } from 'src/infrastructure/databases/base.repository.interface';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User>;
}
