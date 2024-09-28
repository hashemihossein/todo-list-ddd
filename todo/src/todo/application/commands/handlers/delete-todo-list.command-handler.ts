import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoListCommand } from '../delete-todo-list.command';
import { TodoList } from 'src/todo/domain/todo-list';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListCommandHandler
  implements ICommandHandler<DeleteTodoListCommand>
{
  async execute(command: DeleteTodoListCommand): Promise<TodoList> {
    return null;
  }
}
