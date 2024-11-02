import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { TodoList } from 'src/todo/domain/todo-list';
import { TodoListFactory } from 'src/todo/domain/factories/todo-list.factory';
import { TodoListCreatedEvent } from 'src/todo/domain/events/todo-list/todo-list-created.event';
import { AggregateRehydrator } from 'src/todo/infrastructure/persistence/esdb/rehydrator/aggregate.rehydrator';
import { TodoListUpdatedEvent } from 'src/todo/domain/events/todo-list/todo-list-updated.event';
import { DeleteTodoListCommand } from '../delete-todo-list.command';
import { SerializedEventPayload } from 'src/todo/domain/events/interfaces/serializable-event';
import { TodoListDeletedEvent } from 'src/todo/domain/events/todo-list/todo-list-deleted.event';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListCommandHandler
  implements ICommandHandler<SerializedEventPayload<DeleteTodoListCommand>>
{
  constructor(
    private readonly aggregateRehydrator: AggregateRehydrator,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute(command: SerializedEventPayload<DeleteTodoListCommand>): Promise<TodoList> {
    const todoList = await this.aggregateRehydrator.rehydrate(command.id, TodoList);

    if ( !todoList ) {
      throw new Error(`There is no list with id: ${command.id}`)
    }

    todoList.apply(new TodoListDeletedEvent({id :command.id}))
    this.eventPublisher.mergeObjectContext(todoList)
    todoList.commit()

    return todoList;
  }
}
