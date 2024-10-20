import { jsonEvent } from '@eventstore/db-client';
import { EventBase } from 'src/todo/domain/events/event-base';
import { ESDBEventsType } from '../types/esdb-events-type';

export class EventMapper {
  static toPersistence(event: EventBase): ESDBEventsType {
    const mappedEvent = jsonEvent(event);
    return mappedEvent;
  }
}
