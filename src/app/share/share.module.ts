import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareRepository } from './repositories/mongoose/share.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ShareItem } from './schemas/share-item.schema';
import { ShareController } from './share.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Share', schema: ShareItem }])],
  providers: [ShareService, ShareRepository],
  controllers: [ShareController],
  exports: [ShareService],
})
export class ShareModule {}
