import { IShareItem } from '../interfaces/share-item.interface';
import { CreateShareItemDto } from '../dto/create-share-item.dto';
import { IBaseRepository } from '../../../infrastructure/databases/base.repository.interface';

export type IShareRepository = IBaseRepository<IShareItem, CreateShareItemDto>;
