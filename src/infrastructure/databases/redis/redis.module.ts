import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import redis from 'redis';

import { RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static forRoot(option?: redis.ClientOpts): DynamicModule {
    console.log(option);
    return {
      module: RedisModule,
      providers: [
        {
          provide: RedisService,
          useFactory: client => {
            return new RedisService(client);
          },
          inject: [redis.RedisClient],
        },
        {
          provide: redis.RedisClient,
          useFactory: (configService: ConfigService) => {
            return redis.createClient(
              option || {
                host: configService.get('REDIS_HOST'),
                port: configService.get<number>('REDIS_PORT'),
                db: configService.get<number>('REDIS_DB'),
              },
            );
          },
          inject: [ConfigService],
        },
      ],
      exports: [RedisService, redis.RedisClient],
    };
  }
}
