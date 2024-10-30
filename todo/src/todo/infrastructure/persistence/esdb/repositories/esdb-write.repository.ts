import {
  AppendResult,
  EventStoreDBClient,
  FORWARDS,
  START,
} from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';
import { ESDBRepository } from 'src/todo/application/ports/esdb.repository';
import { SerializableEvent } from 'src/todo/domain/events/interfaces/serializable-event';
import { ESDBCoreService } from '../core/esdb-core.service';
import { EventMapper } from '../mappers/event.mapper';
import { Error } from 'mongoose';

@Injectable()
export class ESDBWriteRepository extends ESDBRepository {
  private readonly client: EventStoreDBClient;
  constructor(private readonly esdbConfigService: ESDBCoreService) {
    super();
    this.client = esdbConfigService.getClient();
  }

  async appendToStream(
    eventOrEvents: SerializableEvent | SerializableEvent[],
    expectedRevision: 'any' | 'no_stream' | 'stream_exists' = 'any',
  ): Promise<boolean> {
    let events: SerializableEvent[];
    if (!Array.isArray(eventOrEvents)) {
      events = [eventOrEvents];
    }

    if (!events.length) {
      throw new Error('nothing for append to stream!');
    }

    const mappedEvents = EventMapper.toPersistence(events);
    try {
      const appendResult: AppendResult = await this.client.appendToStream(
        'TodoList-bcb0fbdb-faa7-444f-b0dd-09744ca4aa6d',
        [...mappedEvents, ...mappedEvents, ...mappedEvents],
        {
          expectedRevision: expectedRevision,
        },
      );
      console.log(appendResult.nextExpectedRevision, appendResult.position);
      return appendResult.success;
    } catch (error) {
      console.error(error);
    }
  }

  async readEventsFromStream(streamId: string) {
    const events = this.client.readStream(streamId, {
      fromRevision: START,
      direction: FORWARDS,
    });
    return events;
  }
}
