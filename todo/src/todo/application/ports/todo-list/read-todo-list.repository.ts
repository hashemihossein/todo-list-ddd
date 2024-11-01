import { TodoListReadModel } from '../../../domain/read-models/todo-list.read-model';

export abstract class TodoListReadRepository {
  abstract upsert(
    alarm: Pick<TodoListReadModel, 'id'> & Partial<TodoListReadModel>,
  ): Promise<TodoListReadModel>;

  abstract read(listId: string): Promise<TodoListReadModel>;
}
