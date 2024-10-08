import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListCreatedEvent } from 'src/todo/domain/events/todo-list-created.event';
import { ReadTodoListRepository } from '../ports/todo-list/read-todo-list.repository';
import { TodoListReadModelFactory } from 'src/todo/domain/factories/todo-list-read-model.factory';

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedEventHandler
  implements IEventHandler<TodoListCreatedEvent>
{
  constructor(
    private readonly readTodoListRepository: ReadTodoListRepository,
    private readonly todoListReadModelFactory: TodoListReadModelFactory,
  ) {}

  async handle(event: TodoListCreatedEvent) {
    const readModelTodoList = this.todoListReadModelFactory.create(
      event.todoList,
    );
    await this.readTodoListRepository.save(readModelTodoList);
  }
}
