import { randomUUID } from 'crypto';
import { TodoItem } from '../../todo-item';
import { EventBaseType } from '../event-base';

export class TodoItemCreatedEvent extends EventBaseType {
  constructor(public readonly todoItem: TodoItem) {
    super();
    this.type = 'todo-item-created';
    this.data = todoItem;
    this.id = randomUUID();
  }
}
