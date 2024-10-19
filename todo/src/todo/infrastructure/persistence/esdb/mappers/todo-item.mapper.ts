import { jsonEvent } from '@eventstore/db-client';
import { EventBaseType } from 'src/todo/domain/events/event-base';
import { ESDBEventsType } from '../types/esdb-events-type';

export class TodoItemEventMapper {
  static toPersistence(event: EventBaseType): ESDBEventsType {
    const mappedEvent = jsonEvent(event);
    return mappedEvent;
  }
}
