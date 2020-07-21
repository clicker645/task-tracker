import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { authProviders } from './auth.provider';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { RedisModule } from '../../infrastructure/databases/redis/redis.module';
import { RedisService } from '../../infrastructure/databases/redis/redis.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    RedisModule.forRoot(),
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
  exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService],
})
export class AuthModule {}
