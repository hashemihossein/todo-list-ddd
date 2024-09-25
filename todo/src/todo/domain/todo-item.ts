import { TodoList } from './todo-list';
import { TodoItemPriority } from './value-objects/todo-item-priority';
import { TodoItemState } from './value-objects/todo-item-state';

export class TodoItem {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public listId: string,
    public priority: TodoItemPriority,
    public state: TodoItemState,
    public estimatedTime: number,
    public loggedTime: number,
  ) {}
}
