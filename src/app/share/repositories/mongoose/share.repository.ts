import { BaseRepository } from '../../../../infrastructure/databases/mongoose/repository/base.repository';
import { IShareItem } from '../../interfaces/share-item.interface';
import { CreateShareItemDto } from '../../dto/create-share-item.dto';
import { FilterQuery, PaginateModel } from 'mongoose';
import { IShareRepository } from '../share.repository.interface';

export class ShareRepository
  extends BaseRepository<IShareItem, CreateShareItemDto>
  implements IShareRepository {
  constructor(private shareModel: PaginateModel<IShareItem>) {
    super(shareModel);
  }

  async findOne(filter: FilterQuery<IShareItem>): Promise<IShareItem> {
    return this.shareModel.findOne(filter);
  }
}
