import { ModelsEnum } from '../../../../models/models.enum';
import { Connection, PaginateModel } from 'mongoose';
import { mongooseConnection } from '../mongoose.provider';
import { IDocumentHistory } from './interfaces/document-history.interface';
import { DocumentHistorySchema } from './repositories/mongoose/schemas/change.schema';
import { DocumentHistoryRepository } from './repositories/mongoose/document-history.repository';
import { DocumentHistoryService } from './document-history.service';

export const documentHistoryProviders = [
  {
    provide: ModelsEnum.DOCUMENT_HISTORY,
    useFactory: (connection: Connection) =>
      connection.model(ModelsEnum.DOCUMENT_HISTORY, DocumentHistorySchema),
    inject: [mongooseConnection],
  },
  {
    provide: DocumentHistoryRepository,
    useFactory: (model: PaginateModel<IDocumentHistory>) => {
      return new DocumentHistoryRepository(model);
    },
    inject: [ModelsEnum.DOCUMENT_HISTORY],
  },
  {
    provide: DocumentHistoryService,
    useFactory: repository => {
      return new DocumentHistoryService(repository);
    },
    inject: [DocumentHistoryRepository],
  },
];
