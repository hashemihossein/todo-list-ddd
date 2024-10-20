import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../create-todo-list.command';
import { TodoList } from 'src/todo/domain/todo-list';
import { TodoListFactory } from 'src/todo/domain/factories/todo-list.factory';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListCommandHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(
    private readonly todoListFactory: TodoListFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute(command: CreateTodoListCommand): Promise<TodoList> {
    const todoList = this.todoListFactory.create(
      command.title,
      command.description,
      command.userId,
    );

    this.eventPublisher.mergeObjectContext(todoList);
    todoList.commit();

    return todoList;
  }
}
