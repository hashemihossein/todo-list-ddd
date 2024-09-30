import { TodoList } from 'src/todo/domain/todo-list';

export abstract class WriteTodoListRepository {
  abstract save(todoList: TodoList): Promise<TodoList>;
  abstract update(todoList: TodoList): Promise<TodoList>;
  abstract delete(id: string): Promise<TodoList>;

  abstract findOne(id: string): Promise<TodoList>;
}
