import { UpdateTodoItemCommand } from '../application/commands/udpate-todo-item.command';
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

  public update(value: UpdateTodoItemCommand): void {
    if (value?.title) {
      this.title = value.title;
    }
    if (value?.description) {
      this.description = value.description;
    }
    if (value?.estimatedTime) {
      this.estimatedTime = value.estimatedTime;
    }
    if (value?.priority) {
      const newPriority = new TodoItemPriority(
        value.priority as TodoItemPriority['value'],
      );
      this.priority = newPriority;
    }
    if (value?.state) {
      const newState = new TodoItemState(value.state as TodoItemState['value']);
      this.state = newState;
    }
    if (value?.loggedTime) {
      this.loggedTime = value.loggedTime;
    }
  }
}
