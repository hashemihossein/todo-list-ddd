import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListReadRepository } from '../ports/read-todo-list.repository';
import { SerializedEventPayload } from 'src/todo/domain/events/interfaces/serializable-event';
import { TodoItemDeletedEvent } from 'src/todo/domain/events/todo-item/todo-item-deleted.event';

@EventsHandler(TodoItemDeletedEvent)
export class TodoItemDeletedEventHandler
  implements IEventHandler<SerializedEventPayload<TodoItemDeletedEvent>>
{
  constructor(
    private readonly readTodoListRespository: TodoListReadRepository,
  ) {}

  async handle(event: SerializedEventPayload<TodoItemDeletedEvent>) {
    const todoListReadModel = await this.readTodoListRespository.readByListId(
      event.payload.listId,
    );

    todoListReadModel.items.filter((item) => item.id != event.payload.id);

    this.readTodoListRespository.upsertList(todoListReadModel);
  }
}
