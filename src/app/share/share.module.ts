import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { shareProviders } from './share.providers';
import { DatabaseModule } from '../../infrastructure/databases/mongoose/mongoose.module';

@Module({
  imports: [DatabaseModule],
  providers: [...shareProviders],
  controllers: [],
  exports: [ShareService],
})
export class ShareModule {}
