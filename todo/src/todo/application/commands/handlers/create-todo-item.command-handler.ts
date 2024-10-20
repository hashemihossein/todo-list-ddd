import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoItemCommand } from '../create-todo-item.command';
import { TodoItemRepository } from '../../ports/todo-item/todo-item.repository';
import { TodoItemFactory } from 'src/todo/domain/factories/todo-item.factory';
import { TodoItem } from 'src/todo/domain/todo-item';

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemCommandHandler
  implements ICommandHandler<CreateTodoItemCommand>
{
  constructor() {}
  async execute(command: CreateTodoItemCommand): Promise<void> {}
}
