import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoItemCommand } from '../delete-todo-item.command';
import { TodoItem } from 'src/todo/domain/todo-item';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemCommandHandler
  implements ICommandHandler<DeleteTodoItemCommand>
{
  async execute(command: DeleteTodoItemCommand): Promise<TodoItem> {
    return null;
  }
}
