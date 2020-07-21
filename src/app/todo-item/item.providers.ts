import { Connection, PaginateModel } from 'mongoose';

import { mongooseConnection } from '../../infrastructure/databases/mongoose/mongoose.provider';
import { MongooseItemRepository } from './repositories/mongoose/mongoose.item.repository';
import { ItemService } from './item.service';
import { ShareService } from '../share/share.service';
import { DocumentHistoryService } from '../document-history/document-history.service';
import { Item, ItemSchema } from './item.entity';
import { modelsEnum } from '../../config/config.const';

export const itemProviders = [
  {
    provide: MongooseItemRepository,
    useFactory: (connection: Connection) => {
      const itemModel = connection.model(modelsEnum.ITEM, ItemSchema);
      return new MongooseItemRepository(itemModel as PaginateModel<Item>);
    },
    inject: [mongooseConnection],
  },
  {
    provide: ItemService,
    useFactory: (repository, authService, shareService, docHistoryService) => {
      return new ItemService(repository, shareService, docHistoryService);
    },
    inject: [MongooseItemRepository, ShareService, DocumentHistoryService],
  },
];
