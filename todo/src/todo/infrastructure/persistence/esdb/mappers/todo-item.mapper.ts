import { jsonEvent, MetadataType } from '@eventstore/db-client';
import { randomUUID } from 'crypto';
import { TodoItemEvent } from 'src/todo/domain/events/todo-item';

type esdbEventTypes = {
  id: string;
  contentType: 'application/octet-stream';
  type: string;
  data: any;
  metadata: MetadataType;
};

export class TodoItemEventMapper {
  static toPersistence(event: TodoItemEvent): esdbEventTypes {
    const mappedEvent = jsonEvent({
      id: randomUUID(),
      type: 'todo-item',
      data: JSON.parse(JSON.stringify(event)),
    });
    return mappedEvent;
  }
}
