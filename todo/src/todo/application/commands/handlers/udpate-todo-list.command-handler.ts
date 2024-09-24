import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from '../udpate-todo-list.command';
import { WriteTodoListRepository } from '../../ports/todo-list/write-todo-list.repository';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListCommandHandler
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(
    private readonly writeTodoListRepository: WriteTodoListRepository,
  ) {}
  async execute(command: UpdateTodoListCommand): Promise<any> {
    return await this.writeTodoListRepository.update(command);
  }
}
