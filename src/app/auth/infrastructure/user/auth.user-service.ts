import { User } from '../../../user/domain/user.model';

export interface IAuthUserService {
  findByEmail(email: string): Promise<User>;
}
