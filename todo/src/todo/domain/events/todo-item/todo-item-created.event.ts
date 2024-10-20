import { randomUUID } from 'crypto';
import { TodoItem } from '../../todo-item';
import { EventBase } from '../event-base';

export class TodoItemCreatedEvent extends EventBase {
  constructor(public readonly todoItem: TodoItem) {
    super();
    this.type = 'todo-item-created';
    this.data = todoItem;
    this.id = randomUUID();
  }
}
