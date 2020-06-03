import { BaseRepository } from '../../../../infrastructure/databases/mongoose/base.repository';
import { IItem } from '../../interfaces/item.interface';
import { CreateItemDto } from '../../dto/create-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { PaginationOptions } from '../../../../infrastructure/databases/mongoose/paginate.params';
import { IItemRepository } from '../item.repository.interface';
import { ModelsEnum } from '../../../../models/models.enum';

@Injectable()
export class ItemRepository extends BaseRepository<IItem, CreateItemDto>
  implements IItemRepository {
  constructor(
    @InjectModel(ModelsEnum.ITEM) private itemModel: PaginateModel<IItem>,
  ) {
    super(itemModel);
  }

  async getByUser(
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IItem>> {
    return await this.itemModel.paginate({ uId: userId }, pagination);
  }

  // async addHistoryChange(_id: string, data: CreateChangeHistoryDto) {
  //   return this.itemModel.updateOne(
  //     { _id },
  //     {
  //       $push: { changeHistory: data },
  //     },
  //   );
  // }
}
