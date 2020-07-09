import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService } from '../application/auth.service';
import { RedisService } from 'src/infrastructure/databases/redis/redis.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../../user/application/user.service';

export const authProviders: Provider[] = [
  {
    provide: AuthService,
    useFactory: (jwtService, redisService, userService, configService) => {
      return new AuthService(
        jwtService,
        redisService,
        userService,
        configService,
      );
    },
    inject: [JwtService, RedisService, UserService, ConfigService],
  },
  {
    provide: JwtStrategy,
    useFactory: (redisService, configService) => {
      return new JwtStrategy(redisService, configService);
    },
    inject: [RedisService, ConfigService],
  },
];
