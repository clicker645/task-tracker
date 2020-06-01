import { BaseRepository } from '../../../../components/repository/base.repository';
import { IItem } from '../../interfaces/item.interface';
import { CreateItemDto } from '../../dto/create-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { PaginationOptions } from '../../../../components/pagination/paginate.params';
import { IItemRepository } from '../item.repository.interface';

@Injectable()
export class ItemRepository extends BaseRepository<IItem, CreateItemDto>
  implements IItemRepository {
  constructor(@InjectModel('Item') private itemModel: PaginateModel<IItem>) {
    super(itemModel);
  }

  async getByUser(
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IItem>> {
    return await this.itemModel.paginate({ uId: userId }, pagination);
  }
}
