import { Module } from '@nestjs/common';

import { MailModule } from './infrastructure/mail/mail.module';
import { DocumentHistoryModule } from './app/document-history/document-history.module';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { ItemModule } from './app/todo-item/item.module';
import { ShareModule } from './app/share/share.module';

@Module({
  imports: [
    DocumentHistoryModule,
    AuthModule,
    ShareModule,
    UserModule,
    ItemModule,
    MailModule,
  ],
  controllers: [],
})
export class AppModule {}
