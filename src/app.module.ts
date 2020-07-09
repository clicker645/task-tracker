import { Module } from '@nestjs/common';

import { MailModule } from './infrastructure/mail/mail.module';
import { DocumentHistoryModule } from './infrastructure/databases/mongoose/document-history/document-history.module';
import { AuthModule } from './app/auth/infrastructure/auth.module';
import { UserModule } from './app/user/infrastructure/user.module';

@Module({
  imports: [DocumentHistoryModule, AuthModule, UserModule, MailModule],
  controllers: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer): any {
  //   consumer
  //     .apply(CasbinRBACMiddleware)
  //     .exclude({
  //       path: '/user/password/reset',
  //       method: RequestMethod.POST,
  //     })
  //     .forRoutes(UserController, ItemController, ShareController, {
  //       path: '/auth/logout',
  //       method: RequestMethod.POST,
  //     });
  // }
}
