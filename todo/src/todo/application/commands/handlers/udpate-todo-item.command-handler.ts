import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from '../udpate-todo-item.command';
import { TodoItem } from 'src/todo/domain/todo-item';
import { TodoItemRepository } from '../../ports/todo-item/todo-item.repository';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemCommandHandler
  implements ICommandHandler<UpdateTodoItemCommand>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}
  async execute(command: UpdateTodoItemCommand): Promise<TodoItem> {
    const todoItem = await this.todoItemRepository.findOne(command.id);

    if (!todoItem) {
      throw new Error(`todo item with id of ${command.id} is unavailable`);
    }

    todoItem.update(command);
    return await this.todoItemRepository.update(todoItem);
  }
}
