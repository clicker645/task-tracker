import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './repositories/mongoose/schemas/item.schema';
import { ItemController } from './item.controller';
import { ItemRepository } from './repositories/mongoose/item.repository';
import { AuthModule } from '../auth/auth.module';
import { ShareModule } from '../share/share.module';
import { ModelsEnum } from '../../models/models.enum';
import { DocumentHistoryModule } from '../../infrastructure/databases/mongoose/document-history/document-history.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelsEnum.ITEM, schema: ItemSchema }]),
    AuthModule,
    ShareModule,
    DocumentHistoryModule,
  ],
  providers: [ItemService, ItemRepository],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {}
