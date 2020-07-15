import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import redis from 'redis';

@Injectable()
export class RedisService {
  private client: redis.RedisClient;
  constructor(private readonly configService: ConfigService) {
    this.client = redis.createClient({
      host: configService.get('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
      db: configService.get<number>('REDIS_DB'),
    });
  }

  async set(key: string, value: any, duration: number): Promise<boolean> {
    return this.client.set(
      key.toString(),
      JSON.stringify(value),
      'EX',
      duration,
      e => {
        if (e) {
          throw new Error(e.toString());
        }
      },
    );
  }

  async exist(key: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client.exists(key, (err, ok) => {
        err ? reject(err) : resolve(Boolean(ok));
      });
    });
  }

  async get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        err ? reject(err) : resolve(JSON.parse(reply));
      });
    });
  }

  async delete(key: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        err ? reject(err) : resolve(!!reply);
      });
    });
  }
}
