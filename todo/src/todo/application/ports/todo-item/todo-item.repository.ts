import { TodoItem } from 'src/todo/domain/todo-item';
export abstract class TodoItemRepository {
  //commands
  abstract save(todoItem: TodoItem): Promise<TodoItem>;
  abstract update(
    updateTodoItemsParams: Pick<TodoItem, 'id'> & Partial<TodoItem>,
  ): Promise<TodoItem>;

  //queries
  abstract findOne(id: string): Promise<TodoItem>;
}
