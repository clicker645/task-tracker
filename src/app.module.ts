import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { configModule } from './configure.root';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';

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
  ],
})
export class AppModule {}
