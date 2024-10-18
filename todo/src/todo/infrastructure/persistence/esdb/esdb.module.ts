import { Module } from '@nestjs/common';
import { RedisModule } from '../../in-memory/redis/redis.module';

@Module({
  imports: [],
})
export class ESDBModule {}
