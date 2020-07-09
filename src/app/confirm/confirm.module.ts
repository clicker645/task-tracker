import { Module } from '@nestjs/common';
import { MailModule } from '../../infrastructure/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { ConfirmService } from './confirm.service';

@Module({
  imports: [MailModule, ConfigModule],
  providers: [ConfirmService],
  exports: [ConfirmService],
})
export class ConfirmModule {}
