import { Module } from '@nestjs/common';
import { ESDBRepository } from 'src/todo/application/ports/esdb.repository';
import { ESDBConfigModule } from './config/esdb-config.module';
import { ESDBConfigService } from './config/esdb-config.service';
import { RedisModule } from '../../in-memory/redis/redis.module';
import { ESDBWriteRepository } from './repositories/esdb-write.repository';

@Module({
  imports: [ESDBConfigModule, RedisModule],
  providers: [
    ESDBConfigService,
    {
      provide: ESDBRepository,
      useClass: ESDBWriteRepository,
    },
  ],
  exports: [ESDBRepository],
})
export class ESDBModule {}
