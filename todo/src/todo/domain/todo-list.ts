import { TodoItem } from './todo-item';
import { VersionedAggregateRoot } from './aggregate-root/versioned-aggregate-root';
import { TodoListCreatedEvent } from './events/todo-list/todo-list-created.event';
import { SerializedEventPayload } from './events/interfaces/serializable-event';
import { TodoListUpdatedEvent } from './events/todo-list/todo-list-updated.event';
import { TodoItemAddedToListEvent } from './events/todo-list/todo-item-added-to-list.event';
import { TodoItemFactory } from './factories/todo-item.factory';
import { TodoListDeletedEvent } from './events/todo-list/todo-list-deleted.event';

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

  [`on${TodoItemAddedToListEvent.name}`](
    event: SerializedEventPayload<TodoItemAddedToListEvent>,
  ) {
    this.items.push(event.todoItemId);
  }

  [`on${TodoListDeletedEvent.name}`](
    event: SerializedEventPayload<TodoListDeletedEvent>
  ){
    throw new Error(`Todo list with id: ${event.payload.id} has been deleted before`)
  }
}
