import { IShareItem } from '../interfaces/share-item.interface';
import { CreateShareItemDto } from '../dto/create-share-item.dto';
import { IBaseRepository } from '../../../infrastructure/databases/base.repository.interface';
import { FilterQuery } from 'mongoose';

export interface IShareRepository
  extends IBaseRepository<IShareItem, CreateShareItemDto> {
  findOne(filter: FilterQuery<IShareItem>): Promise<IShareItem>;
}
