import { BaseRepository } from '../../../../components/repository/base.repository';
import { IShareItem } from '../../interfaces/share-item.interface';
import { CreateShareItemDto } from '../../dto/create-share-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShareRepository extends BaseRepository<
  IShareItem,
  CreateShareItemDto
> {
  constructor(
    @InjectModel('Share') private shareModel: PaginateModel<IShareItem>,
  ) {
    super(shareModel);
  }

  async findOne(filter: FilterQuery<IShareItem>) {
    return this.shareModel.findOne(filter);
  }
}
