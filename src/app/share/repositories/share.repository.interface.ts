import { IBaseRepository } from '../../../components/repository/interfaces/base.repository.interface';
import { IShareItem } from '../interfaces/share-item.interface';
import { CreateShareItemDto } from '../dto/create-share-item.dto';

export type IShareRepository = IBaseRepository<IShareItem, CreateShareItemDto>
