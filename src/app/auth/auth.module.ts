import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from './token/token.module';
import { UserModule } from '../user/user.module';
import { authProviders } from './auth.providers';
import { MailModule } from '../../infrastructure/mail/mail.module';
import { ConfirmModule } from '../confirm/confirm.module';

@Module({
  imports: [TokenModule, UserModule, MailModule, ConfirmModule],
  providers: [...authProviders],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
