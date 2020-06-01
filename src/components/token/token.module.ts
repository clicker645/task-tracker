import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from './schemas/user-token.schema';
import { JwtModule } from '@nestjs/jwt';
import { configModule } from '../../configure.root';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { TokenRepository } from './repositories/mongoose/token.repository';

@Module({
  imports: [
    configModule,
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MailService,
    ConfigService,
  ],
  providers: [TokenService, TokenRepository, MailService],
  exports: [TokenService],
})
export class TokenModule {}
