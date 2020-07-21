import { Injectable } from '@nestjs/common';
import redis from 'redis';
import util from 'util';

const modeDurationInSeconds = 'EX';

@Injectable()
export class RedisService {
  constructor(private readonly client: redis.RedisClient) {}

  async set(key: string, value: any, duration: number): Promise<boolean> {
    const redisSet = util.promisify(this.client.set).bind(this.client);
    const ok = await redisSet(
      key.toString(),
      JSON.stringify(value),
      modeDurationInSeconds,
      duration,
    );

    return Boolean(ok);
  }

  async exist(key: string): Promise<boolean> {
    const redisExist = util.promisify(this.client.exists).bind(this.client);
    const exists = redisExist(key);

    return Boolean(exists);
  }

  async get(key: string): Promise<any> {
    const redisGet = await util.promisify(this.client.get).bind(this.client);
    const obj = await redisGet(key);

    return JSON.parse(obj);
  }

  async delete(key: string): Promise<boolean> {
    const redisDel = util.promisify(this.client.del).bind(this.client);
    const success = redisDel(key);

    return Boolean(success);
  }
}
