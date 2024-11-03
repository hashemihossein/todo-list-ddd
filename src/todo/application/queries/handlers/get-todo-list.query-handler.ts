import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoListQuery } from '../get-todo-list.query';
import { TodoListReadModel } from 'src/todo/domain/read-models/todo-list.read-model';
import { TodoListReadRepository } from '../../ports/read-todo-list.repository';

@QueryHandler(GetTodoListQuery)
export class GetTodoListQueryHandler
  implements IQueryHandler<GetTodoListQuery>
{
  constructor(
    private readonly readTodoListRepository: TodoListReadRepository,
  ) {}
  async execute(query: GetTodoListQuery): Promise<TodoListReadModel> {
    return await this.readTodoListRepository.readByListId(query.listId);
  }
}
