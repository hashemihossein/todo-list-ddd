import { BadRequestException, Injectable } from '@nestjs/common';
import { VersionedAggregateRoot } from 'src/todo/domain/aggregate-root/versioned-aggregate-root';
import { SerializableEvent } from 'src/todo/domain/events/interfaces/serializable-event';
@Injectable()
export class EventSerializer {
  serialize<T>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ): SerializableEvent<T> {
    const eventType = event.constructor.name;

    if (!eventType) throw new BadRequestException('Incompatible event type');

    const streamId = `${dispatcher.constructor.name}-${dispatcher.id}`;

    return {
      id: streamId,
      position: dispatcher.version.value.valueOf(),
      type: eventType,
      data: this.toJSON(event),
    };
  }

  private toJSON<T>(data: T) {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    if ('toJSON' in data && typeof data.toJSON === 'function') {
      return data.toJSON();
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.toJSON(item));
    }

    return Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = this.toJSON(value);
      return acc;
    }, {});
  }
}
