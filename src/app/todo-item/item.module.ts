import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ShareModule } from '../share/share.module';
import { DocumentHistoryModule } from '../../infrastructure/databases/mongoose/document-history/document-history.module';
import { itemProviders } from './item.providers';
import { DatabaseModule } from '../../infrastructure/databases/mongoose/mongoose.module';

@Module({
  imports: [DatabaseModule, ShareModule, DocumentHistoryModule],
  providers: [...itemProviders],
  controllers: [],
  exports: [ItemService],
})
export class ItemModule {}
