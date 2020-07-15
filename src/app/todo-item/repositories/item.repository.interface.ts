import { PaginationOptions } from '../../../infrastructure/databases/mongoose/pagination/paginate.params';
import { IBaseRepository } from '../../../infrastructure/databases/base.repository.interface';
import { Item } from '../item.entity';

export interface IItemRepository extends IBaseRepository<Item> {
  getByUserId(userId: string, pagination: PaginationOptions);
}
