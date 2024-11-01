import {
  AppendResult,
  EventStoreDBClient,
  ExpectedRevision,
  FORWARDS,
  ReadRevision,
  START,
} from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';
import { ESDBRepository } from 'src/todo/application/ports/esdb.repository';
import { SerializableEvent } from 'src/todo/domain/events/interfaces/serializable-event';
import { ESDBCoreService } from '../core/esdb-core.service';
import { EventMapper } from '../mappers/event.mapper';
import { Error } from 'mongoose';
import { ManyToOne } from 'typeorm';
import { VersionedAggregateRoot } from 'src/todo/domain/aggregate-root/versioned-aggregate-root';

@Injectable()
export class ESDBWriteRepository extends ESDBRepository {
  private readonly client: EventStoreDBClient;
  constructor(private readonly esdbConfigService: ESDBCoreService) {
    super();
    this.client = esdbConfigService.getClient();
  }

  async appendToStream(
    eventOrEvents: SerializableEvent | SerializableEvent[],
    snapshot: SerializableEvent = null,
  ): Promise<boolean> {
    let events: SerializableEvent[];
    if (!Array.isArray(eventOrEvents)) {
      events = [eventOrEvents];
    }

    if (!events.length) {
      throw new Error('nothing for append to stream!');
    }
    const expectedRevision: ExpectedRevision =
      events[0].position === -1n ? 'no_stream' : events[0].position.valueOf();

    const mappedEvents = EventMapper.toPersistence(events);
    try {
      const appendResult: AppendResult = await this.client.appendToStream(
        events[0].id,
        mappedEvents,
        {
          expectedRevision: expectedRevision,
        },
      );

      if (snapshot) {
        const snapshotExpectedRevision: bigint =
          expectedRevision === 'no_stream'
            ? 1n
            : events[0].position.valueOf() + BigInt(events.length);
        await this._appendSnapshotToStream(snapshot, snapshotExpectedRevision);
      }

      return appendResult.success;
    } catch (error) {
      console.error(error);
    }
  }

  async readEventsFromStream(streamId: string) {
    const streamMetadata = await this.client.getStreamMetadata(streamId);
    let fromRevision: ReadRevision = START;
    if (streamMetadata.metadata?.lastSnapshotRevision) {
      if (typeof streamMetadata.metadata?.lastSnapshotRevision === 'string') {
        fromRevision = BigInt(streamMetadata.metadata?.lastSnapshotRevision);
      }
    }
    const events = this.client.readStream(streamId, {
      fromRevision,
      direction: FORWARDS,
    });
    return events;
  }

  private async _appendSnapshotToStream(
    snapshot: SerializableEvent,
    snapshotExpectedRevision: bigint,
  ): Promise<void> {
    try {
      const appendableSnapshot = EventMapper.toPersistence([snapshot]);
      await this.client.appendToStream(snapshot.id, appendableSnapshot, {
        expectedRevision: snapshotExpectedRevision,
      });
      await this.client.setStreamMetadata(snapshot.id, {
        lastSnapshotRevision: snapshotExpectedRevision.toString(),
      });
    } catch (error) {
      console.error(error);
    }
  }
}
