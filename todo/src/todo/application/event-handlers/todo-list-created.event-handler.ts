import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListCreatedEvent } from 'src/todo/domain/events/todo-list/todo-list-created.event';
import { ReadTodoListRepository } from '../ports/todo-list/read-todo-list.repository';

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedEventHandler
  implements IEventHandler<TodoListCreatedEvent>
{
  constructor(
    private readonly readTodoListRespository: ReadTodoListRepository,
  ) {}

  async handle(event: TodoListCreatedEvent) {
    await this.readTodoListRespository.upsert(event.todoList);
  }
}
