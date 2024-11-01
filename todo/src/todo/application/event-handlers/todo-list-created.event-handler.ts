import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListCreatedEvent } from 'src/todo/domain/events/todo-list/todo-list-created.event';
import { TodoListReadRepository } from '../ports/todo-list/read-todo-list.repository';

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedEventHandler
  implements IEventHandler<TodoListCreatedEvent>
{
  constructor(
    private readonly readTodoListRespository: TodoListReadRepository,
  ) {}

  async handle(event: TodoListCreatedEvent) {
    await this.readTodoListRespository.upsert({
      id: event.todoList.id,
      description: event.todoList.description,
      items: [],
      title: event.todoList.title,
      userId: event.todoList.userId,
    });
  }
}
