import { ModelsEnum } from '../../models/models.enum';
import { Connection, PaginateModel } from 'mongoose';
import { mongooseConnection } from '../../infrastructure/databases/mongoose/mongoose.provider';
import { ItemSchema } from './repositories/mongoose/schemas/item.schema';
import { ItemRepository } from './repositories/mongoose/item.repository';
import { IItem } from './interfaces/item.interface';
import { ItemService } from './item.service';
import { ShareService } from '../share/share.service';
import { DocumentHistoryService } from '../../infrastructure/databases/mongoose/document-history/document-history.service';

export const itemProviders = [
  {
    provide: ModelsEnum.ITEM,
    useFactory: (connection: Connection) =>
      connection.model(ModelsEnum.ITEM, ItemSchema),
    inject: [mongooseConnection],
  },
  {
    provide: ItemRepository,
    useFactory: (model: PaginateModel<IItem>) => {
      return new ItemRepository(model);
    },
    inject: [ModelsEnum.ITEM],
  },
  {
    provide: ItemService,
    useFactory: (repository, authService, shareService, docHistoryService) => {
      return new ItemService(repository, shareService, docHistoryService);
    },
    inject: [ItemRepository, ShareService, DocumentHistoryService],
  },
];
