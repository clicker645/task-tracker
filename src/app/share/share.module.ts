import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareRepository } from './repositories/mongoose/share.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ShareItem } from './repositories/mongoose/schemas/share-item.schema';
import { ShareController } from './share.controller';
import { ModelsEnum } from '../../models/models.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelsEnum.SHARE, schema: ShareItem }]),
  ],
  providers: [ShareService, ShareRepository],
  controllers: [ShareController],
  exports: [ShareService],
})
export class ShareModule {}
