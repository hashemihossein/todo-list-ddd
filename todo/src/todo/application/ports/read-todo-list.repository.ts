import { TodoListReadModel } from '../../domain/read-models/todo-list.read-model';

export abstract class TodoListReadRepository {
  abstract upsertList(
    todoList: Pick<TodoListReadModel, 'id'> & Partial<TodoListReadModel>,
  ): Promise<void>;

  abstract readByListId(listId: string): Promise<TodoListReadModel>;
  abstract deleteByListId(listId: string): Promise<void>;
}
