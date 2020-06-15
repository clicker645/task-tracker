import { BaseRepository } from '../../../../infrastructure/databases/mongoose/repository/base.repository';
import { IItem } from '../../interfaces/item.interface';
import { CreateItemDto } from '../../dto/create-item.dto';
import { PaginateModel, PaginateResult } from 'mongoose';
import { PaginationOptions } from '../../../../infrastructure/databases/mongoose/pagination/paginate.params';
import { IItemRepository } from '../item.repository.interface';

export class ItemRepository extends BaseRepository<IItem, CreateItemDto>
  implements IItemRepository {
  constructor(private itemModel: PaginateModel<IItem>) {
    super(itemModel);
  }

  async getByUser(
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IItem>> {
    return await this.itemModel.paginate({ userId: userId }, pagination);
  }
}
