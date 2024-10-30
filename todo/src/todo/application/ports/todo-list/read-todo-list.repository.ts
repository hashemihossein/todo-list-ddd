import { TodoList } from 'src/todo/domain/todo-list';
import { TodoListReadModel } from '../../../domain/read-models/todo-list.read-model';

export abstract class ReadTodoListRepository {
  abstract upsert(
    alarm: Pick<TodoList, 'id'> & Partial<TodoList>,
  ): Promise<TodoListReadModel>;
}
