import { Module } from '@nestjs/common';
import { RedisModule } from 'src/todo/infrastructure/in-memory/redis/redis.module';

@Module({
  imports: [RedisModule],
})
export class ESDBCoreModule {}
