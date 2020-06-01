import { IBaseRepository } from '../../../components/repository/interfaces/base.repository.interface';
import { IUser } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserRepository extends IBaseRepository<IUser, CreateUserDto> {
  findByEmail(email: string): Promise<IUser>;
}
