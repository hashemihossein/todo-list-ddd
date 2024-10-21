import { AppendResult, EventStoreDBClient } from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';
import { ESDBRepository } from 'src/todo/application/ports/esdb.repository';
import { EventBase } from 'src/todo/domain/events/event-base';
import { ESDBCoreService } from '../core/esdb-core.service';
import { EventMapper } from '../mappers/event.mapper';

@Injectable()
export class ESDBWriteRepository extends ESDBRepository {
  private readonly client: EventStoreDBClient;
  constructor(private readonly esdbConfigService: ESDBCoreService) {
    super();
    this.client = esdbConfigService.getClient();
  }

  async appendToStream(
    event: EventBase,
    expectedRevision: 'any' | 'no_stream' | 'stream_exists' = 'any',
  ): Promise<boolean> {
    const mappedEvent = EventMapper.toPersistence(event);
    const appendResult: AppendResult = await this.client.appendToStream(
      `${event?.metadata?.streamPrefix ?? ''}-${mappedEvent.data.id}`,
      mappedEvent,
      {
        expectedRevision: expectedRevision,
      },
    );

    return appendResult.success;
  }
}
