import { TodoItem } from '../../todo-item';

export class TodoItemCreatedEvent {
  constructor(public readonly todoItem: TodoItem) {}
}
