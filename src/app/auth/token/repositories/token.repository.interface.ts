import { IUserToken } from '../interfaces/user-token.interface';
import { CreateUserTokenDto } from '../dto/create-user-token.dto';
import { IBaseRepository } from '../../../../infrastructure/databases/base.repository.interface';

export interface ITokenRepository
  extends IBaseRepository<IUserToken, CreateUserTokenDto> {
  deleteByUserId(uId: string): Promise<{ ok?: number; n?: number }>;
  exists(uId: string, token: string): Promise<boolean>;
}
