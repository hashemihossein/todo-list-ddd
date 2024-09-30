import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from '../udpate-todo-list.command';
import { WriteTodoListRepository } from '../../ports/todo-list/write-todo-list.repository';
import { TodoList } from 'src/todo/domain/todo-list';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListCommandHandler
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(
    private readonly writeTodoListRepository: WriteTodoListRepository,
  ) {}
  async execute(command: UpdateTodoListCommand): Promise<TodoList> {
    const todoList = await this.writeTodoListRepository.findOne(command.id);

    if (!todoList) {
      throw new Error(`list with id: ${command.id} not found`);
    }

    todoList.update(command);
    return await this.writeTodoListRepository.update(todoList);
  }
}
