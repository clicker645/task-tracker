import { PaginateModel, PaginateResult } from 'mongoose';

import { BaseRepository } from '../../../../infrastructure/databases/mongoose/repository/base.repository';
import { PaginationOptions } from '../../../../infrastructure/databases/mongoose/pagination/paginate.params';
import { IItemRepository } from '../item.repository.interface';
import { Item } from '../../item.entity';

export class MongooseItemRepository extends BaseRepository<Item>
  implements IItemRepository {
  constructor(private itemModel: PaginateModel<Item>) {
    super(itemModel);
  }

  async getByUserId(
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<Item>> {
    return await this.itemModel.paginate({ userId: userId }, pagination);
  }
}
