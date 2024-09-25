import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../create-todo-list.command';
import { TodoList } from 'src/todo/domain/todo-list';
import { randomUUID } from 'crypto';
import { WriteTodoListRepository } from '../../ports/todo-list/write-todo-list.repository';
import { TodoListFactory } from 'src/todo/domain/factories/todo-list.factory';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListCommandHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(
    private readonly writeTodoListRepository: WriteTodoListRepository,
    private readonly todoListFactory: TodoListFactory,
  ) {}
  async execute(command: CreateTodoListCommand): Promise<TodoList> {
    const todoList = this.todoListFactory.create(
      command.title,
      command.description,
      command.userId,
    );

    return await this.writeTodoListRepository.save(todoList);
  }
}
