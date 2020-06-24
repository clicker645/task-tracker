import { Injectable } from '@nestjs/common';
import redis from 'redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private client: redis.RedisClient;
  constructor(private readonly configService: ConfigService) {
    this.client = redis.createClient({
      host: configService.get<string>('REDIS_HOST'),
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
    const promise = new Promise<boolean>((resolve, reject) => {
      this.client.exists(key, (e, ok) => {
        resolve(Boolean(ok));
        reject(e);
      });
    });

    return promise;
  }

  async get(key: string): Promise<any> {
    return this.client.get(key, e => {
      if (e) {
        throw new Error(e.toString());
      }
    });
  }

  async delete(key: string): Promise<boolean> {
    return this.client.del(key, e => {
      if (e) {
        throw new Error(e.toString());
      }
    });
  }
}
