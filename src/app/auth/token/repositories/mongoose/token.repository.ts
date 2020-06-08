import { BaseRepository } from '../../../../../infrastructure/databases/mongoose/repository/base.repository';
import { IUserToken } from '../../interfaces/user-token.interface';
import { CreateUserTokenDto } from '../../dto/create-user-token.dto';
import { ITokenRepository } from '../token.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ModelsEnum } from '../../../../../models/models.enum';

@Injectable()
export class TokenRepository
  extends BaseRepository<IUserToken, CreateUserTokenDto>
  implements ITokenRepository {
  constructor(
    @InjectModel(ModelsEnum.TOKEN)
    private readonly tokenModel: PaginateModel<IUserToken>,
  ) {
    super(tokenModel);
  }

  async deleteByUserId(userId: string): Promise<{ ok?: number; n?: number }> {
    return this.tokenModel.deleteOne({ userId });
  }

  async exists(userId: string, token: string): Promise<boolean> {
    return await this.tokenModel.exists({ userId, token });
  }
}
