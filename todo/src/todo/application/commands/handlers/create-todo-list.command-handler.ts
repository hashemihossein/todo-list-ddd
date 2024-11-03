import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../create-todo-list.command';
import { TodoList } from 'src/todo/domain/todo-list';
import { TodoListFactory } from 'src/todo/domain/factories/todo-list.factory';
import { ESDBRepository } from '../../ports/esdb.repository';
import { TodoListCreatedEvent } from 'src/todo/domain/events/todo-list/todo-list-created.event';

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

    todoList.apply(new TodoListCreatedEvent(todoList));
    this.eventPublisher.mergeObjectContext(todoList);
    todoList.commit();
    return todoList;
  }
}
