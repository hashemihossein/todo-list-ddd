import { Module } from '@nestjs/common';
import { ESDBRepository } from 'src/todo/application/ports/esdb.repository';
import { ESDBCoreModule } from './core/esdb-core.module';
import { ESDBCoreService } from './core/esdb-core.service';
import { RedisModule } from '../../in-memory/redis/redis.module';
import { ESDBWriteRepository } from './repositories/esdb-write.repository';
import { EventStorePublisher } from './event-publishers/event-publisher';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { EventSerializer } from './serializers/event.serializer';
import { EventDeserializer } from './deserializers/event.deserializer';
import { AggregateRehydrator } from './rehydrator/aggregate.rehydrator';

@Module({
  imports: [ESDBCoreModule, RedisModule, CqrsModule],
  providers: [
    ESDBCoreService,
    EventStorePublisher,
    EventSerializer,
    EventDeserializer,
    ESDBWriteRepository,
    AggregateRehydrator,
    {
      provide: ESDBRepository,
      useExisting: ESDBWriteRepository,
    },
  ],
  exports: [
    ESDBRepository,
    ESDBCoreService,
    EventDeserializer,
    AggregateRehydrator,
  ],
})
export class ESDBModule {}
