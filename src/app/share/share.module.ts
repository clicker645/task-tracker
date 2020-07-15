import { Module } from '@nestjs/common';

import { ShareService } from './share.service';
import { shareProviders } from './share.providers';
import { DatabaseModule } from '../../infrastructure/databases/mongoose/mongoose.module';
import { ShareController } from './share.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...shareProviders],
  controllers: [ShareController],
  exports: [ShareService],
})
export class ShareModule {}
