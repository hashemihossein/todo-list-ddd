import { TodoItem } from 'src/todo/domain/todo-item';
import { IUpdateTodoItemParams } from './interfaces/update-todo-item-params.interface';
export abstract class TodoItemRepository {
  //commands
  abstract save(todoItem: TodoItem): Promise<TodoItem>;
  abstract update(
    updateTodoItemsParams: IUpdateTodoItemParams,
  ): Promise<TodoItem>;

  //queries
  abstract findOne(id: string): Promise<TodoItem>;
}
