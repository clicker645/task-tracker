import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schemas/item.schema';
import { ItemController } from './item.controller';
import { ItemRepository } from './repositories/mongoose/item.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }])],
  providers: [ItemService, ItemRepository],
  controllers: [ItemController],
})
export class ItemModule {}
