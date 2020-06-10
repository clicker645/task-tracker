import { CreateUserTokenDto } from '../dto/create-user-token.dto';
import { IBaseRepository } from '../../../../infrastructure/databases/base.repository.interface';
import { IToken } from '../interfaces/token.interface';

export interface ITokenRepository
  extends IBaseRepository<IToken, CreateUserTokenDto> {
  deleteByUserId(userId: string): Promise<boolean>;
  exists(userId: string, token: string): Promise<boolean>;
}
