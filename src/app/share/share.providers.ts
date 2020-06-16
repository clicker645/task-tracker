import { ModelsEnum } from '../../models/models.enum';
import { Connection, PaginateModel } from 'mongoose';
import { mongooseConnection } from '../../infrastructure/databases/mongoose/mongoose.provider';
import { ShareItem } from './repositories/mongoose/schemas/share-item.schema';
import { ShareRepository } from './repositories/mongoose/share.repository';
import { IShareItem } from './interfaces/share-item.interface';
import { ShareService } from './share.service';

export const shareProviders = [
  {
    provide: ModelsEnum.SHARE,
    useFactory: (connection: Connection) =>
      connection.model(ModelsEnum.SHARE, ShareItem),
    inject: [mongooseConnection],
  },
  {
    provide: ShareRepository,
    useFactory: (model: PaginateModel<IShareItem>) => {
      return new ShareRepository(model);
    },
    inject: [ModelsEnum.SHARE],
  },
  {
    provide: ShareService,
    useFactory: repository => {
      return new ShareService(repository);
    },
    inject: [ShareRepository],
  },
];
