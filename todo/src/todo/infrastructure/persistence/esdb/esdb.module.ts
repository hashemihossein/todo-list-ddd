import { Module } from '@nestjs/common';
import { ESDBRepository } from 'src/todo/application/ports/esdb.repository';
import { ESDBCoreModule } from './core/esdb-core.module';
import { ESDBCoreService } from './core/esdb-core.service';
import { RedisModule } from '../../in-memory/redis/redis.module';
import { ESDBWriteRepository } from './repositories/esdb-write.repository';

@Module({
  imports: [ESDBCoreModule, RedisModule],
  providers: [
    ESDBCoreService,
    {
      provide: ESDBRepository,
      useClass: ESDBWriteRepository,
    },
  ],
  exports: [ESDBRepository, ESDBCoreService],
})
export class ESDBModule {}
