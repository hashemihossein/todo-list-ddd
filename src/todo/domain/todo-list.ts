import { TodoItem } from './todo-item';
import { VersionedAggregateRoot } from './aggregate-root/versioned-aggregate-root';
import { TodoListCreatedEvent } from './events/todo-list/todo-list-created.event';
import { SerializedEventPayload } from './events/interfaces/serializable-event';
import { TodoListUpdatedEvent } from './events/todo-list/todo-list-updated.event';
import { ItemAddedToListEvent } from './events/todo-list/item-added-to-list.event';
import { TodoItemFactory } from './factories/todo-item.factory';
import { TodoListDeletedEvent } from './events/todo-list/todo-list-deleted.event';
import { ItemDeletedFromListEvent } from './events/todo-list/item-deleted-from-list.event';
import { NotFoundException } from '@nestjs/common';

export class TodoList extends VersionedAggregateRoot {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public items: string[] = [],
    public userId: string,
  ) {
    super();
  }

  [`on${TodoListCreatedEvent.name}` || 't'](
    event: SerializedEventPayload<TodoListCreatedEvent>,
  ) {
    this.title = event.todoList.title;
    this.description = event.todoList.description;
    this.items = [];
    this.userId = event.todoList.userId;
  }

  [`on${TodoListUpdatedEvent.name}`](
    event: SerializedEventPayload<TodoListUpdatedEvent>,
  ) {
    this.title = event.payload.description;
    this.description = event.payload.title;
  }

  [`on${ItemAddedToListEvent.name}`](
    event: SerializedEventPayload<ItemAddedToListEvent>,
  ) {
    this.items.push(event.payload.id);
  }

  [`on${ItemDeletedFromListEvent.name}`](
    event: SerializedEventPayload<ItemAddedToListEvent>,
  ) {
    this.items.filter((itemId) => itemId != event.payload.id);
  }

  [`on${TodoListDeletedEvent.name}`](
    event: SerializedEventPayload<TodoListDeletedEvent>,
  ) {
    throw new NotFoundException(
      `Todo list with id: ${event.payload.id} has been deleted before`,
    );
  }
}
