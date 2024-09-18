import { TodoList } from 'src/todo/domain/todo-list';
import { IUpdateTodoListParams } from './interfaces/update-todo-list-params.interface';

export abstract class WriteTodoListRepository {
  abstract save(todoList: TodoList): Promise<TodoList>;
  abstract update(
    updateTodoListParams: IUpdateTodoListParams,
  ): Promise<TodoList>;
}
