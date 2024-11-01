import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListReadRepository } from '../ports/todo-list/read-todo-list.repository';
import { TodoListUpdatedEvent } from 'src/todo/domain/events/todo-list/todo-list-updated.event';

@EventsHandler(TodoListUpdatedEvent)
export class TodoListUpdatedEventHandler
  implements IEventHandler<TodoListUpdatedEvent>
{
  constructor(
    private readonly readTodoListRespository: TodoListReadRepository,
  ) {}

  async handle(event: TodoListUpdatedEvent) {
    await this.readTodoListRespository.upsert({
      id: event.payload.id,
      title: event.payload.description,
      description: event.payload.description,
    });
  }
}
