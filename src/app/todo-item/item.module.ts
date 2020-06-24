import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { AuthModule } from '../auth/auth.module';
import { ShareModule } from '../share/share.module';
import { DocumentHistoryModule } from '../../infrastructure/databases/mongoose/document-history/document-history.module';
import { itemProviders } from './item.providers';
import { DatabaseModule } from '../../infrastructure/databases/mongoose/mongoose.module';
import { ItemResolver } from './item.resolver';

@Module({
  imports: [DatabaseModule, AuthModule, ShareModule, DocumentHistoryModule],
  providers: [...itemProviders, ItemResolver],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {}
