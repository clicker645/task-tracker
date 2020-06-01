import { BaseRepository } from '../../../repository/base.repository';
import { IUserToken } from '../../interfaces/user-token.interface';
import { CreateUserTokenDto } from '../../dto/create-user-token.dto';
import { ITokenRepository } from '../token.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenRepository
  extends BaseRepository<IUserToken, CreateUserTokenDto>
  implements ITokenRepository {
  constructor(
    @InjectModel('Token')
    private readonly tokenModel: PaginateModel<IUserToken>,
  ) {
    super(tokenModel);
  }

  async deleteByUserId(uId: string): Promise<{ ok?: number; n?: number }> {
    return this.tokenModel.deleteOne({ uId });
  }

  async exists(uId: string, token: string): Promise<boolean> {
    return await this.tokenModel.exists({ uId, token });
  }
}
