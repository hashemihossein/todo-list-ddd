import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoListQuery } from '../get-todo-list.query';
import { TodoListReadModel } from 'src/todo/domain/read-models/todo-list.read-model';
import { ReadTodoListRepository } from '../../ports/todo-list/read-todo-list.repository';

@QueryHandler(GetTodoListQuery)
export class GetTodoListQueryHandler
  implements IQueryHandler<GetTodoListQuery>
{
  constructor(
    private readonly readTodoListRepository: ReadTodoListRepository,
  ) {}
  async execute(query: GetTodoListQuery): Promise<TodoListReadModel> {
    return null;
  }
}
