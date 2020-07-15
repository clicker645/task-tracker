import { PaginateModel } from 'mongoose';

import { BaseRepository } from '../../../../infrastructure/databases/mongoose/repository/base.repository';
import { IShareRepository } from '../share.repository.interface';
import { ShareItem } from '../../share-item.entity';

export class MongooseShareRepository extends BaseRepository<ShareItem>
  implements IShareRepository {
  constructor(private shareModel: PaginateModel<ShareItem>) {
    super(shareModel);
  }
}
