import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoListQuery } from '../get-todo-list.query';
import { TodoListReadModel } from 'src/todo/domain/read-models/todo-list.read-model';
import { TodoListReadRepository } from '../../ports/read-todo-list.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetTodoListQuery)
export class GetTodoListQueryHandler
  implements IQueryHandler<GetTodoListQuery>
{
  constructor(
    private readonly readTodoListRepository: TodoListReadRepository,
  ) {}
  async execute(query: GetTodoListQuery): Promise<TodoListReadModel> {
    const todoList = await this.readTodoListRepository.readByListId(
      query.listId,
    );
    if (!todoList) {
      throw new NotFoundException(
        `There is on todo list with id: ${query.listId}`,
      );
    }

    return todoList;
  }
}
