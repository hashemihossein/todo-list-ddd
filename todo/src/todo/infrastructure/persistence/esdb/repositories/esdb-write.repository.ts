import {
  AppendResult,
  EventStoreDBClient,
  FORWARDS,
  jsonEvent,
  START,
} from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';
import { isArray } from 'class-validator';
import { ESDBRepository } from 'src/todo/application/ports/esdb.repository';
import { VersionedAggregateRoot } from 'src/todo/domain/aggregate-root/versioned-aggregate-root';
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
    console.dir(mappedEvents, { depth: Infinity });
    const appendResult: AppendResult = await this.client.appendToStream(
      events[0].id,
      mappedEvents,
      {
        expectedRevision: expectedRevision,
      },
    );

    return appendResult.success;
  }

  async readEventsFromStream(streamId: string) {
    const events = this.client.readStream(streamId, {
      fromRevision: START,
      direction: FORWARDS,
    });
    console.log(events, ':D:D:');
    return events;
  }
}
