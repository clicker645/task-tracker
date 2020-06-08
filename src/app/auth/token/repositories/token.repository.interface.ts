import { IUserToken } from '../interfaces/user-token.interface';
import { CreateUserTokenDto } from '../dto/create-user-token.dto';
import { IBaseRepository } from '../../../../infrastructure/databases/base.repository.interface';

export interface ITokenRepository
  extends IBaseRepository<IUserToken, CreateUserTokenDto> {
  deleteByUserId(userId: string): Promise<{ ok?: number; n?: number }>;
  exists(userId: string, token: string): Promise<boolean>;
}
