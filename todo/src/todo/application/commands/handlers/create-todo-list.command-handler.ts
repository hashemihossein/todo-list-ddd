import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../create-todo-list.command';
import { TodoList } from 'src/todo/domain/todo-list';
import { WriteTodoListRepository } from '../../ports/todo-list/write-todo-list.repository';
import { TodoListFactory } from 'src/todo/domain/factories/todo-list.factory';
import { TodoListCreatedEvent } from 'src/todo/domain/events/todo-list-created.event';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListCommandHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(
    private readonly writeTodoListRepository: WriteTodoListRepository,
    private readonly todoListFactory: TodoListFactory,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: CreateTodoListCommand): Promise<TodoList> {
    const todoList = this.todoListFactory.create(
      command.title,
      command.description,
      command.userId,
    );

    const persistedTodoList = await this.writeTodoListRepository.save(todoList);
    this.eventBus.publish(new TodoListCreatedEvent(persistedTodoList));
    console.log(persistedTodoList, ':D:D:');
    return persistedTodoList;
  }
}
