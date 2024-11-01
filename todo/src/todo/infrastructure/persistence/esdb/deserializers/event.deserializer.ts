import {
  JSONType,
  PersistentSubscriptionToStreamResolvedEvent,
} from '@eventstore/db-client';
import { Injectable, Type } from '@nestjs/common';
import { SerializableEvent } from 'src/todo/domain/events/interfaces/serializable-event';
import { TodoListCreatedEvent } from 'src/todo/domain/events/todo-list/todo-list-created.event';
import { RecievedEventType } from '../types/received-event.type';
import { EventClassRegistry } from 'src/todo/domain/events/event-class.registry';

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: RecievedEventType): SerializableEvent<T> {
    const eventCls = this.getEventClassByType(event.type);
    return {
      id: event.streamId,
      position: event.revision,
      type: event.type,
      data: this.instantiateSerializedEvent(eventCls, event.data),
    };
  }

  getEventClassByType(type: string) {
    return EventClassRegistry.get(type);
  }

  instantiateSerializedEvent<T extends Type>(eventCls: T, data: JSONType) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}
