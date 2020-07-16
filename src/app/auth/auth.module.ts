import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { authProviders } from './auth.provider';
import { RedisModule } from 'src/infrastructure/databases/redis/redis.module';
import { AuthController } from './auth.controller';
import { RedisService } from 'src/infrastructure/databases/redis/redis.service';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UserModule,
    RedisModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_TOKEN_LIFETIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [...authProviders, RedisService, AuthResolver],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
