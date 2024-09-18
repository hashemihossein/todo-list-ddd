import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './create-todo-list.command';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListCommandHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  execute(command: CreateTodoListCommand): Promise<any> {
    //handling for creating todolist
    return null;
  }
}
