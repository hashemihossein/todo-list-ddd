import { randomUUID } from 'crypto';
import { TodoList } from '../../todo-list';
import { EventBase } from '../event-base';

export class TodoListCreatedEvent extends EventBase {
  constructor(public readonly todoList: TodoList) {
    super();
    this.type = 'todo-list-created';
    this.data = todoList;
    this.id = randomUUID();
  }
}
