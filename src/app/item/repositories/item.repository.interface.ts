import { IBaseRepository } from '../../../components/repository/interfaces/base.repository.interface';
import { PaginationOptions } from '../../../components/pagination/paginate.params';
import { IItem } from '../interfaces/item.interface';
import { CreateItemDto } from '../dto/create-item.dto';

export interface IItemRepository extends IBaseRepository<IItem, CreateItemDto> {
  getByUser(userId: string, pagination: PaginationOptions);
}
