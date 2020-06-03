import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentHistorySchema } from './repositories/mongoose/schemas/change.schema';
import { DocumentHistoryService } from './document-history.service';
import { DocumentHistoryRepository } from './repositories/mongoose/document-history.repository';
import { ModelsEnum } from '../../../../models/models.enum';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelsEnum.DOCUMENT_HISTORY, schema: DocumentHistorySchema },
    ]),
  ],
  providers: [DocumentHistoryService, DocumentHistoryRepository],
  exports: [DocumentHistoryService],
})
export class DocumentHistoryModule {}
