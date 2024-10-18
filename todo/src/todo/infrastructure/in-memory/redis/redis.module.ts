import { Module } from '@nestjs/common';
import { RedisConfigModule } from './config/redis-config.module';
import { RedisService } from './redis.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RedisConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
