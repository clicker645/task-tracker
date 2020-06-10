import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from './repositories/mongoose/schemas/user-token.schema';
import { JwtModule } from '@nestjs/jwt';
import { TokenRepository } from './repositories/mongoose/token.repository';
import { MailModule } from '../../../infrastructure/mail/mail.module';
import { ModelsEnum } from '../../../models/models.enum';
import { RedisModule } from '../../../infrastructure/databases/redis/redis.module';
import { RedisService } from '../../../infrastructure/databases/redis/redis.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelsEnum.TOKEN, schema: TokenSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MailModule,
    RedisModule,
  ],
  providers: [TokenService, TokenRepository, RedisService],
  exports: [TokenService],
})
export class TokenModule {}
