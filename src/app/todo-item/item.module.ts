import { Module } from '@nestjs/common';

import { ItemService } from './item.service';
import { ShareModule } from '../share/share.module';
import { DocumentHistoryModule } from '../document-history/document-history.module';
import { itemProviders } from './item.providers';
import { DatabaseModule } from '../../infrastructure/databases/mongoose/mongoose.module';
import { ItemController } from './item.controller';

@Module({
  imports: [DatabaseModule, ShareModule, DocumentHistoryModule],
  providers: [...itemProviders],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {}
