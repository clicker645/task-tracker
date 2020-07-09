import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { authProviders } from './auth.provider';
import { RedisModule } from 'src/infrastructure/databases/redis/redis.module';
import { AuthController } from './http/controllers/auth.controller';
import { RedisService } from 'src/infrastructure/databases/redis/redis.service';
import { UserModule } from '../../user/infrastructure/user.module';

@Module({
  imports: [
    UserModule,
    RedisModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_TOKEN_LIFETIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [...authProviders, RedisService],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
