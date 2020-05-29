import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';

import { configModule } from './configure.root';
import { TokenModule } from './components/token/token.module';
import { MailModule } from './components/mail/mail.module';
import { ItemModule } from './app/item/item.module';
import { CasbinRBACMiddleware } from './middlewares/casbin.middleware';
import { CasbinModule } from './app/casbin/casbin.module';
import { UserController } from './app/user/user.controller';

@Module({
  imports: [
    configModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UserModule,
    TokenModule,
    MailModule,
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
