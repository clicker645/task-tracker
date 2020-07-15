import { IBaseRepository } from '../../../infrastructure/databases/base.repository.interface';
import { ShareItem } from '../share-item.entity';

export interface IShareRepository extends IBaseRepository<ShareItem> {}
