import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { DocumentHistoryModule } from './app/document-history/document-history.module';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { ItemModule } from './app/todo-item/item.module';
import { ShareModule } from './app/share/share.module';
import { GraphQLModule } from '@nestjs/graphql';
import { CasbinModule } from './app/casbin/cabin.module';
import { CasbinRBACMiddleware } from './middlewares/casbin.middleware';
import { UserController } from './app/user/user.controller';
import { appConstants } from './config/config.const';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      autoSchemaFile: appConstants.defaultGraphQLSchemaName,
      context: ({ req }) => ({ req }),
    }),
    DocumentHistoryModule,
    AuthModule,
    ShareModule,
    UserModule,
    ItemModule,
    CasbinModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CasbinRBACMiddleware).forRoutes(UserController);
  }
}
