import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { TokenModule } from './app/auth/token/token.module';
import { MailModule } from './infrastructure/mail/mail.module';
import { ItemModule } from './app/todo-item/item.module';
import { CasbinRBACMiddleware } from './middlewares/casbin.middleware';
import { CasbinModule } from './app/auth/casbin/casbin.module';
import { UserController } from './app/user/user.controller';
import { ShareModule } from './app/share/share.module';
import { DocumentHistoryModule } from './infrastructure/databases/mongoose/document-history/document-history.module';
import { ItemController } from './app/todo-item/item.controller';
import { ShareController } from './app/share/share.controller';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      playground: true,
      debug: true,
    }),
    DocumentHistoryModule,
    AuthModule,
    UserModule,
    TokenModule,
    MailModule,
    ItemModule,
    CasbinModule,
    ShareModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(CasbinRBACMiddleware)
      .exclude({
        path: '/user/password/reset',
        method: RequestMethod.POST,
      })
      .forRoutes(UserController, ItemController, ShareController, {
        path: '/auth/logout',
        method: RequestMethod.POST,
      });
  }
}
