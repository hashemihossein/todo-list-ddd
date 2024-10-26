import { Module } from '@nestjs/common';
import { ESDBRepository } from 'src/todo/application/ports/esdb.repository';
import { ESDBCoreModule } from './core/esdb-core.module';
import { ESDBCoreService } from './core/esdb-core.service';
import { RedisModule } from '../../in-memory/redis/redis.module';
import { ESDBWriteRepository } from './repositories/esdb-write.repository';
import { EventStorePublisher } from './event-publishers/event-publisher';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { EventSerializer } from './serializers/event.serializer';

@Module({
  imports: [ESDBCoreModule, RedisModule, CqrsModule],
  providers: [
    ESDBCoreService,
    EventStorePublisher,
    EventSerializer,
    ESDBWriteRepository,
    {
      provide: ESDBRepository,
      useExisting: ESDBWriteRepository,
    },
  ],
  exports: [ESDBRepository, ESDBCoreService],
})
export class ESDBModule {}
