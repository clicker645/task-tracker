import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { configModule } from '../../configure.root';

@Module({
  imports: [configModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
