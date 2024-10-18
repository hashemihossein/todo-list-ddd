import { Module } from '@nestjs/common';

@Module({
  providers: [RedisConfigModule],
  exports: [RedisConfigModule],
})
export class RedisConfigModule {}
