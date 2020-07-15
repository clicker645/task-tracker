import { Module } from '@nestjs/common';

import { MailService } from './mail.service';
import { configModule } from '../../config/configure.root';

@Module({
  imports: [configModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
