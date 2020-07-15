import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailModule } from '../../infrastructure/mail/mail.module';
import { ConfirmService } from './confirm.service';

@Module({
  imports: [MailModule, ConfigModule],
  providers: [ConfirmService],
  exports: [ConfirmService],
})
export class ConfirmModule {}
