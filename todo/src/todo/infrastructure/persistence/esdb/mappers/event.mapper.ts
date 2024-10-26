import { jsonEvent } from '@eventstore/db-client';
import { SerializableEvent } from 'src/todo/domain/events/interfaces/serializable-event';
import { MetadataType } from '@eventstore/db-client';

export class EventMapper {
  static toPersistence(event: SerializableEvent[]) {
    const mappedEvents = event.map((event) =>
      jsonEvent({
        data: event.data,
        type: event.type,
        metadata: {
          position: event.position,
        },
      }),
    );
    return mappedEvents;
  }
}
