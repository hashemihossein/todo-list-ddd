import {
    CommandHandler,
    EventBus,
    EventPublisher,
    ICommandHandler,
  } from '@nestjs/cqrs';
  import { TodoList } from 'src/todo/domain/todo-list';
  import { AggregateRehydrator } from 'src/todo/infrastructure/persistence/esdb/rehydrator/aggregate.rehydrator';
  import { TodoListUpdatedEvent } from 'src/todo/domain/events/todo-list/todo-list-updated.event';
  import { UpdateTodoItemCommand } from '../udpate-todo-item.command';
import { TodoItem } from 'src/todo/domain/todo-item';
import { TodoItemUpdatedEvent } from 'src/todo/domain/events/todo-item/todo-item-updated.event';
  
  @CommandHandler(UpdateTodoItemCommand)
  export class UpdateTodoItemCommandHandler
    implements ICommandHandler<UpdateTodoItemCommand>
  {
    constructor(
      private readonly aggregateRehydrator: AggregateRehydrator,
      private readonly eventPublisher: EventPublisher,
    ) {}
    async execute(command: UpdateTodoItemCommand): Promise<TodoItem> {
      
      // we should rehydrate the parent todo list first, and if it was deleted, we should thrown an error.
       
      const todoItem = await this.aggregateRehydrator.rehydrate(
        command.id,
        TodoItem,
      );

      if ( command?.description ) {
        todoItem.description = command.description
      }
      if ( command?.estimatedTime ) {
        todoItem.estimatedTime = command.estimatedTime
      }
      if ( command?.loggedTime ) {
        todoItem.loggedTime = command.loggedTime
      }
      if ( command?.title ) {
        todoItem.title = command.title
      }
      if ( command?.state ) {
        todoItem.setState(command.state)
      }
      if ( command?.priority ) {
        todoItem.setPriority(command.priority)
      }

      todoItem.apply(new TodoItemUpdatedEvent(todoItem))
      this.eventPublisher.mergeObjectContext(todoItem);
      todoItem.commit();

      return todoItem;
    }
  }
  