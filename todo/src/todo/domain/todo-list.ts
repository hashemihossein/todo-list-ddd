import { TodoItem } from './todo-item';

export class TodoList {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public items: TodoItem[],
    public userId: string,
  ) {}
}
