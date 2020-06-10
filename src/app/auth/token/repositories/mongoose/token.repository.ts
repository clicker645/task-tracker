import { BaseRepository } from '../../../../../infrastructure/databases/mongoose/repository/base.repository';
import { CreateUserTokenDto } from '../../dto/create-user-token.dto';
import { ITokenRepository } from '../token.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ModelsEnum } from '../../../../../models/models.enum';
import { IToken } from '../../interfaces/token.interface';

@Injectable()
export class TokenRepository extends BaseRepository<IToken, CreateUserTokenDto>
  implements ITokenRepository {
  constructor(
    @InjectModel(ModelsEnum.TOKEN)
    private readonly tokenModel: PaginateModel<IToken>,
  ) {
    super(tokenModel);
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await this.tokenModel.deleteOne({ userId });
    return result.ok === 1 ? true : false;
  }

  async exists(userId: string, token: string): Promise<boolean> {
    return await this.tokenModel.exists({ userId, token });
  }
}
