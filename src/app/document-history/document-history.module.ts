import { Module } from '@nestjs/common';

import { DocumentHistoryService } from './document-history.service';
import { DatabaseModule } from '../../infrastructure/databases/mongoose/mongoose.module';
import { documentHistoryProviders } from './document-history.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...documentHistoryProviders],
  exports: [DocumentHistoryService],
})
export class DocumentHistoryModule {}
