import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';
import { RedisService } from '../../infrastructure/databases/redis/redis.service';

export const authProviders: Provider[] = [
  {
    provide: AuthService,
    useFactory: (jwtService, redisService, configService, userService) => {
      return new AuthService(
        jwtService,
        redisService,
        configService,
        userService,
      );
    },
    inject: [JwtService, RedisService, ConfigService, UserService],
  },
  {
    provide: JwtStrategy,
    useFactory: (redisService, configService) => {
      return new JwtStrategy(redisService, configService);
    },
    inject: [RedisService, ConfigService],
  },
];
