import { Module } from '@nestjs/common';

import { MailModule } from './infrastructure/mail/mail.module';
import { DocumentHistoryModule } from './app/document-history/document-history.module';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { ItemModule } from './app/todo-item/item.module';
import { ShareModule } from './app/share/share.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
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
