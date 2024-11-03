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
import { TodoListUpdatedEvent } from 'src/todo/domain/events/todo-list/todo-list-updated.event';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListCommandHandler
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(
    private readonly aggregateRehydrator: AggregateRehydrator,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute(command: UpdateTodoListCommand): Promise<TodoList> {
    const todoList = await this.aggregateRehydrator.rehydrate(
      command.id,
      TodoList,
    );

    if ( command?.title ) {
      todoList.title = command.title;
    }
    if ( command?.description ) {
      todoList.description = command.description;
    }

    todoList.apply(
      new TodoListUpdatedEvent({
        id: todoList.id,
        title: command.title,
        description: command.description,
      }),
    );
    this.eventPublisher.mergeObjectContext(todoList);
    todoList.commit();

    return todoList;
  }
}
