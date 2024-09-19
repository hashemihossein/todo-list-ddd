import { TodoItem } from 'src/todo/domain/todo-item';
import { IUpdateTodoItemParams } from './interfaces/update-todo-item-params.interface';

export abstract class TodoItemRepository {
  //commands
  abstract save(todoItem: TodoItem): TodoItem;
  abstract update(updateTodoItemsParams: IUpdateTodoItemParams): TodoItem;

  //queries
  abstract findOne(id: string): TodoItem;
}
