import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '../../../infrastructure/databases/redis/redis.module';
import { RedisService } from '../../../infrastructure/databases/redis/redis.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SomeKey',
      signOptions: { expiresIn: '1d' },
    }),
    RedisModule,
  ],
  providers: [TokenService, RedisService],
  exports: [TokenService],
})
export class TokenModule {}
