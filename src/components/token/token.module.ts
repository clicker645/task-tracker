import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from './schemas/user-token.schema';
import { JwtModule } from '@nestjs/jwt';
import { configModule } from '../../configure.root';
import { TokenRepository } from './repositories/mongoose/token.repository';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    configModule,
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MailModule,
  ],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
