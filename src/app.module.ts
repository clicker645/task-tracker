import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
    consumer.apply(CasbinRBACMiddleware).forRoutes(UserController);
  }
}
