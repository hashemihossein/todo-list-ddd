import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListCreatedEvent } from 'src/todo/domain/events/todo-list/todo-list-created.event';
import { TodoListReadRepository } from '../ports/read-todo-list.repository';
import { SerializedEventPayload } from 'src/todo/domain/events/interfaces/serializable-event';

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedEventHandler
  implements IEventHandler<SerializedEventPayload<TodoListCreatedEvent>>
{
  constructor(
    private readonly readTodoListRespository: TodoListReadRepository,
  ) {}

  async handle(event: SerializedEventPayload<TodoListCreatedEvent>) {
    this.readTodoListRespository.upsertList({
      id: event.todoList.id,
      description: event.todoList.description,
      items: [],
      title: event.todoList.title,
      userId: event.todoList.userId,
    });
  }
}
