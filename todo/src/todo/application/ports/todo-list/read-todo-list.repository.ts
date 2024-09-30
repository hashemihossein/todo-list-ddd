import { TodoListReadModel } from '../../../domain/read-models/todo-list.read-model';

export abstract class ReadTodoListRepository {
  abstract findOne(id: string): Promise<TodoListReadModel>;
  abstract update(todoList: TodoListReadModel): Promise<void>;
  abstract save(todoList: TodoListReadModel): Promise<void>;
}
