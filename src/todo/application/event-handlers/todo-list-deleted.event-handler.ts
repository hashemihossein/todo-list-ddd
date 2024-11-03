import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListReadRepository } from '../ports/read-todo-list.repository';
import { SerializedEventPayload } from 'src/todo/domain/events/interfaces/serializable-event';
import { TodoListDeletedEvent } from 'src/todo/domain/events/todo-list/todo-list-deleted.event';

@EventsHandler(TodoListDeletedEvent)
export class TodoListDeletedEventHandler
  implements IEventHandler<SerializedEventPayload<TodoListDeletedEvent>>
{
  constructor(
    private readonly readTodoListRespository: TodoListReadRepository,
  ) {}

  async handle(event: SerializedEventPayload<TodoListDeletedEvent>) {
    this.readTodoListRespository.deleteByListId(event.payload.id);
  }
}
