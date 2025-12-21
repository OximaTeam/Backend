import { Global, Module } from "@nestjs/common";
import Redis from "ioredis";
import { RedisCacheService } from "./redis.service";

@Global()
@Module({
  providers: [
    {
      provide: "REDIS",
      useFactory: () => {
        const client = new Redis({
          host: process.env.REDIS_HOST || "localhost",
          port: Number(process.env.REDIS_PORT) || 6379,
          password: process.env.REDIS_PASSWORD,
          retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
        });
        client.on("connect", () => console.log("✅ Redis connected"));
        client.on("error", (err) => console.error("❌ Redis error:", err));
        return client;
      },
    },
    RedisCacheService,
  ],
  exports: ["REDIS", RedisCacheService],
})
export class RedisModule {}
