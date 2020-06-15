import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';
import { AuthModule } from '../auth/auth.module';
import { shareProviders } from './share.providers';
import { DatabaseModule } from '../../infrastructure/databases/mongoose/mongoose.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [...shareProviders],
  controllers: [ShareController],
  exports: [ShareService],
})
export class ShareModule {}
