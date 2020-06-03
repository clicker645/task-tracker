import { IUser } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { IBaseRepository } from '../../../infrastructure/databases/base.repository.interface';

export interface IUserRepository extends IBaseRepository<IUser, CreateUserDto> {
  findByEmail(email: string): Promise<IUser>;
}
