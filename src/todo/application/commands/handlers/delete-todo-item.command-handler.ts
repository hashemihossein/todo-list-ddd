import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { TodoList } from 'src/todo/domain/todo-list';
import { AggregateRehydrator } from 'src/todo/infrastructure/persistence/esdb/rehydrator/aggregate.rehydrator';
import { TodoListDeletedEvent } from 'src/todo/domain/events/todo-list/todo-list-deleted.event';
import { DeleteTodoItemCommand } from '../delete-todo-item.command';
import { TodoItem } from 'src/todo/domain/todo-item';
import { ItemDeletedFromListEvent } from 'src/todo/domain/events/todo-list/item-deleted-from-list.event';
import { TodoItemDeletedEvent } from 'src/todo/domain/events/todo-item/todo-item-deleted.event';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemCommandHandler
  implements ICommandHandler<DeleteTodoItemCommand>
{
  constructor(
    private readonly aggregateRehydrator: AggregateRehydrator,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute(command: DeleteTodoItemCommand): Promise<TodoItem> {
    const todoItem = await this.aggregateRehydrator.rehydrate(
      command.id,
      TodoItem,
    );

    if (!todoItem) {
      throw new NotFoundException(`There is no item with id: ${command.id}`);
    }

    const todoList = await this.aggregateRehydrator.rehydrate(
      todoItem.listId,
      TodoList,
    );

    if (!todoList) {
      throw new NotFoundException(`There is no item with id: ${command.id}`);
    }

    if (!todoList.items.includes(command.id)) {
      throw new NotFoundException(`There is no item with id: ${command.id}`);
    }

    todoList.items = todoList.items.filter((itemId) => itemId != command.id);
    console.log(todoList, 123123);

    todoList.apply(new ItemDeletedFromListEvent({ id: command.id }));
    this.eventPublisher.mergeObjectContext(todoList);
    todoList.commit();

    todoItem.apply(
      new TodoItemDeletedEvent({ id: command.id, listId: todoItem.listId }),
    );
    this.eventPublisher.mergeObjectContext(todoItem);
    todoItem.commit();

    return todoItem;
  }
}
