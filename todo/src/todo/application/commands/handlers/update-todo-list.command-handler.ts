import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { TodoList } from 'src/todo/domain/todo-list';
import { TodoListFactory } from 'src/todo/domain/factories/todo-list.factory';
import { TodoListCreatedEvent } from 'src/todo/domain/events/todo-list/todo-list-created.event';
import { UpdateTodoListCommand } from '../udpate-todo-list.command';
import { AggregateRehydrator } from 'src/todo/infrastructure/persistence/esdb/rehydrator/aggregate.rehydrator';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListCommandHandler
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(
    private readonly todoListFactory: TodoListFactory,
    private readonly aggregateRehydrator: AggregateRehydrator,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute(command: UpdateTodoListCommand): Promise<TodoList> {
    this.aggregateRehydrator.rehydrate(command.id, TodoList);

    return null;
  }
}
