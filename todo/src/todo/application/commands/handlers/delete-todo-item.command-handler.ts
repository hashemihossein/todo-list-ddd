import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoItemCommand } from '../delete-todo-item.command';
import { TodoItem } from 'src/todo/domain/todo-item';
import { TodoItemRepository } from '../../ports/todo-item/todo-item.repository';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemCommandHandler
  implements ICommandHandler<DeleteTodoItemCommand>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}
  async execute(command: DeleteTodoItemCommand): Promise<TodoItem> {
    const todoItem = await this.todoItemRepository.findOne(command.id);

    if (!todoItem) {
      throw new Error(`item with id: ${command.id} not found`);
    }

    return await this.todoItemRepository.delete(command.id);
  }
}
