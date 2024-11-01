import {
  ConsoleLogger,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { EventBus, IEvent, IEventPublisher } from '@nestjs/cqrs';
import { VersionedAggregateRoot } from 'src/todo/domain/aggregate-root/versioned-aggregate-root';
import { ESDBWriteRepository } from '../repositories/esdb-write.repository';
import { EventSerializer } from '../serializers/event.serializer';
import { SerializableEvent } from 'src/todo/domain/events/interfaces/serializable-event';

@Injectable()
export class EventStorePublisher
  implements OnApplicationBootstrap, IEventPublisher
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventSerializer: EventSerializer,
    private readonly esdbWriteRepository: ESDBWriteRepository,
  ) {}

  onApplicationBootstrap() {
    this.eventBus.publisher = this;
  }

  async publish<T extends IEvent = IEvent>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ) {
    const serializebleEvent = this.eventSerializer.serialize(event, dispatcher);
    return this.esdbWriteRepository.appendToStream(serializebleEvent);
  }

  async publishAll?<T extends IEvent>(
    events: T[],
    dispatcher: VersionedAggregateRoot,
  ) {
    const SerializableEvents = events.map((event) =>
      this.eventSerializer.serialize(event, dispatcher),
    );

    let snapshot: SerializableEvent = null;

    if (
      dispatcher.version.value.valueOf() /
        BigInt(dispatcher.snapshotThreshold) <
      (dispatcher.version.value.valueOf() + BigInt(SerializableEvents.length)) /
        BigInt(dispatcher.snapshotThreshold)
    ) {
      snapshot = this.eventSerializer.serialize(
        dispatcher.snapshotEvent,
        dispatcher,
      );

      snapshot.position =
        snapshot.position.valueOf() + BigInt(SerializableEvents.length);
    }

    return await this.esdbWriteRepository.appendToStream(
      SerializableEvents[0],
      snapshot,
    );
  }
}
