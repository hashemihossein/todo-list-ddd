import { UpdateTodoListCommand } from '../application/commands/udpate-todo-list.command';
import { TodoListFactory } from './factories/todo-list.factory';
import { TodoItem } from './todo-item';

export class TodoList {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public items: TodoItem[],
    public userId: string,
  ) {}

  public update(value: UpdateTodoListCommand): void {
    if (value?.title) {
      this.title = value.title;
    }
    if (value?.description) {
      this.description = value.description;
    }
  }

  public addTodoItem(todoItem: TodoItem): void {
    this.items.push(todoItem);
  }
}
