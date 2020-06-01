import { IBaseRepository } from '../../repository/interfaces/base.repository.interface';
import { IUserToken } from '../interfaces/user-token.interface';
import { CreateUserTokenDto } from '../dto/create-user-token.dto';

export interface ITokenRepository
  extends IBaseRepository<IUserToken, CreateUserTokenDto> {
  deleteByUserId(uId: string): Promise<{ ok?: number; n?: number }>;
  exists(uId: string, token: string): Promise<boolean>;
}
