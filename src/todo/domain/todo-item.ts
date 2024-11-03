import { TodoItemPriority } from './value-objects/todo-item-priority';
import { TodoItemState } from './value-objects/todo-item-state';
import { TodoItemCreatedEvent } from './events/todo-item/todo-item-created.event';
import { SerializedEventPayload } from './events/interfaces/serializable-event';
import { VersionedAggregateRoot } from './aggregate-root/versioned-aggregate-root';
import { TodoItemUpdatedEvent } from './events/todo-item/todo-item-updated.event';

export class TodoItem extends VersionedAggregateRoot {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public listId: string,
    public priority: TodoItemPriority,
    public state: TodoItemState,
    public estimatedTime: number,
    public loggedTime: number,
  ) {
    super();
  }

  setState(state: string) {
    this.state = new TodoItemState(state);
  }

  setPriority(priority: string) {
    this.priority = new TodoItemPriority(priority);
  }

  [`on${TodoItemCreatedEvent.name}`](
    event: SerializedEventPayload<TodoItemCreatedEvent>,
  ) {
    this.title = event.todoItem.title;
    this.description = event.todoItem.description;
    this.listId = event.todoItem.listId;
    this.priority = new TodoItemPriority(event.todoItem.priority);
    this.state = new TodoItemState(event.todoItem.state);
    this.estimatedTime = event.todoItem.estimatedTime;
    this.loggedTime = 0;
  }

  [`on${TodoItemUpdatedEvent.name}`](
    event: SerializedEventPayload<TodoItemUpdatedEvent>,
  ) {
    Object.assign(this, event.todoItem);
  }
}
