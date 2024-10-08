import { TodoList } from '../todo-list';

export class TodoListCreatedEvent {
  constructor(public readonly todoList: TodoList) {}
}
