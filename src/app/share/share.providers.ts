import { Connection, PaginateModel } from 'mongoose';

import { modelsEnum } from '../../config/config.const';
import { mongooseConnection } from '../../infrastructure/databases/mongoose/mongoose.provider';
import { MongooseShareRepository } from './repositories/mongoose/mongoose.share.repository';
import { ShareService } from './share.service';
import { ShareItem, ShareItemSchema } from './share-item.entity';

export const shareProviders = [
  {
    provide: MongooseShareRepository,
    useFactory: (connection: Connection) => {
      const shareItemModel = connection.model(
        modelsEnum.SHARE_ITEM,
        ShareItemSchema,
      );
      return new MongooseShareRepository(
        shareItemModel as PaginateModel<ShareItem>,
      );
    },
    inject: [mongooseConnection],
  },
  {
    provide: ShareService,
    useFactory: repository => {
      return new ShareService(repository);
    },
    inject: [MongooseShareRepository],
  },
];
