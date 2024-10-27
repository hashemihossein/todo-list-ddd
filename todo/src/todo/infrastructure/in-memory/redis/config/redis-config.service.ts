import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisConfigService {
  private readonly redisClient: Redis;

  constructor(private readonly configService: ConfigService) {
    // this.redisClient = new Redis({
    //   host: configService.get<string>('REDIS_HOST', 'localhost'),
    //   port: configService.get<number>('REDIS_PORT'),
    //   password: configService.get<string>('REDIS_PASSWORD'),
    // });
    this.redisClient = new Redis({
      host: 'localhost',
      port: configService.get<number>('REDIS_PORT'),
      password: configService.get<string>('REDIS_PASSWORD'),
    });
  }

  public getClient(): Redis {
    return this.redisClient;
  }
}
