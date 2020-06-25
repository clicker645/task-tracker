import { Module } from '@nestjs/common';
import { TokenModule } from '../auth/token/token.module';
import { MailModule } from '../../infrastructure/mail/mail.module';
import { ConfirmService } from './confirm.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MailModule, TokenModule, ConfigModule],
  providers: [ConfirmService],
  exports: [ConfirmService],
})
export class ConfirmModule {}
