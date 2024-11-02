import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListReadRepository } from '../ports/todo-list/read-todo-list.repository';
import { TodoListUpdatedEvent } from 'src/todo/domain/events/todo-list/todo-list-updated.event';
import { SerializedEventPayload } from 'src/todo/domain/events/interfaces/serializable-event';

@EventsHandler(TodoListUpdatedEvent)
export class TodoListUpdatedEventHandler
  implements IEventHandler<SerializedEventPayload<TodoListUpdatedEvent>>
{
  constructor(
    private readonly readTodoListRespository: TodoListReadRepository,
  ) {}

  async handle(event: SerializedEventPayload<TodoListUpdatedEvent>) {
    this.readTodoListRespository.upsert({
      id: event.payload.id,
      title: event.payload.description,
      description: event.payload.description,
    });
  }
}
