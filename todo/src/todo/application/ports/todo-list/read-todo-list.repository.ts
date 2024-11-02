import { TodoListReadModel } from '../../../domain/read-models/todo-list.read-model';

export abstract class TodoListReadRepository {
  abstract upsert(
    todoList: Pick<TodoListReadModel, 'id'> & Partial<TodoListReadModel>,
  ): Promise<void>;

  abstract read(listId: string): Promise<TodoListReadModel>;
  abstract delete(listId: string): Promise<void>
}
