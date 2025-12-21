import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisCacheService {
  constructor(@Inject("REDIS") private readonly redis: Redis) {}

  async set<T>(key: string, value: T, ttlSeconds = 300) {
    const serialized = JSON.stringify(value);
    await this.redis.set(key, serialized, "EX", ttlSeconds);
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key: string) {
    await this.redis.del(key);
  }
}
