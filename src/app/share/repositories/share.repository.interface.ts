import { IBaseRepository } from '../../../infrastructure/databases/base.repository.interface';
import { ShareItem } from '../share-item.entity';

export type IShareRepository = IBaseRepository<ShareItem>
