import { Connection, PaginateModel } from 'mongoose';

import { modelsEnum } from '../../models/models.enum';
import { mongooseConnection } from '../../infrastructure/databases/mongoose/mongoose.provider';
import { MongooseDocumentHistoryRepository } from './repositories/mongoose/document-history.repository';
import { DocumentHistoryService } from './document-history.service';
import {
  DocumentHistory,
  DocumentHistorySchema,
} from './document-history.entity';

export const documentHistoryProviders = [
  {
    provide: MongooseDocumentHistoryRepository,
    useFactory: (connection: Connection) => {
      const documentHistoryModel = connection.model(
        modelsEnum.DOCUMENT_HISTORY,
        DocumentHistorySchema,
      );
      return new MongooseDocumentHistoryRepository(
        documentHistoryModel as PaginateModel<DocumentHistory>,
      );
    },
    inject: [mongooseConnection],
  },
  {
    provide: DocumentHistoryService,
    useFactory: repository => {
      return new DocumentHistoryService(repository);
    },
    inject: [MongooseDocumentHistoryRepository],
  },
];
