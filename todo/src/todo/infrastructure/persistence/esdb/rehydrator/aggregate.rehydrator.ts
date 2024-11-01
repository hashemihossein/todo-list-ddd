import { Injectable, Type } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { VersionedAggregateRoot } from 'src/todo/domain/aggregate-root/versioned-aggregate-root';
import { ESDBWriteRepository } from '../repositories/esdb-write.repository';
import { EventDeserializer } from '../deserializers/event.deserializer';

@Injectable()
export class AggregateRehydrator {
  constructor(
    private readonly esdbWriteRepository: ESDBWriteRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly eventDeserializer: EventDeserializer,
  ) {}

  async rehydrate<T extends VersionedAggregateRoot>(
    aggregateId: string,
    aggregateCls: Type<T>,
  ): Promise<T> {
    try {
      const streamId = `${aggregateCls.name}-${aggregateId}`;
      const readedEvents =
        await this.esdbWriteRepository.readEventsFromStream(streamId);

      const events = [];
      for await (const event of readedEvents) {
        if (
          event.event.data instanceof Uint8Array ||
          event.event?.isJson === false
        ) {
          throw new Error('incorrect event type!');
        }
        events.push(this.eventDeserializer.deserialize(event.event));
      }

      const aggregateInstance = new aggregateCls(aggregateId);
      this.eventPublisher.mergeObjectContext(aggregateInstance);
      aggregateInstance.loadFromHistory(events);

      return aggregateInstance;
    } catch (error) {
      throw new Error(error);
    }
  }
}
