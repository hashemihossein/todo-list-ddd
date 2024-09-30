import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoListCommand } from '../delete-todo-list.command';
import { TodoList } from 'src/todo/domain/todo-list';
import { WriteTodoListRepository } from '../../ports/todo-list/write-todo-list.repository';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListCommandHandler
  implements ICommandHandler<DeleteTodoListCommand>
{
  constructor(
    private readonly writeTodoListRepository: WriteTodoListRepository,
  ) {}
  async execute(command: DeleteTodoListCommand): Promise<TodoList> {
    const todoList = await this.writeTodoListRepository.findOne(command.id);

    if (!todoList) {
      throw new Error(`list with id: ${command.id} not found`);
    }

    return await this.writeTodoListRepository.delete(command.id);
  }
}
