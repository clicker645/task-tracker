import { PaginationOptions } from '../../../infrastructure/databases/mongoose/paginate.params';
import { IItem } from '../interfaces/item.interface';
import { CreateItemDto } from '../dto/create-item.dto';
import { IBaseRepository } from '../../../infrastructure/databases/base.repository.interface';

export interface IItemRepository extends IBaseRepository<IItem, CreateItemDto> {
  getByUser(userId: string, pagination: PaginationOptions);
}
