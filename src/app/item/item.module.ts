import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schemas/item.schema';
import { ItemController } from './item.controller';
import { ItemRepository } from './repositories/mongoose/item.repository';
import { AuthModule } from '../auth/auth.module';
import { ShareModule } from '../share/share.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    AuthModule,
    ShareModule,
  ],
  providers: [ItemService, ItemRepository],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {}
