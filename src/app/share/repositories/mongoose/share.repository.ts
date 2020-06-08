import { BaseRepository } from '../../../../infrastructure/databases/mongoose/repository/base.repository';
import { IShareItem } from '../../interfaces/share-item.interface';
import { CreateShareItemDto } from '../../dto/create-share-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ModelsEnum } from '../../../../models/models.enum';
import { IShareRepository } from '../share.repository.interface';

@Injectable()
export class ShareRepository
  extends BaseRepository<IShareItem, CreateShareItemDto>
  implements IShareRepository {
  constructor(
    @InjectModel(ModelsEnum.SHARE)
    private shareModel: PaginateModel<IShareItem>,
  ) {
    super(shareModel);
  }

  async findOne(filter: FilterQuery<IShareItem>) {
    return this.shareModel.findOne(filter);
  }
}
