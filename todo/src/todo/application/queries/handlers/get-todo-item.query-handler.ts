import { GetTodoItemQuery } from '../get-todo-item.query';
import { TodoItem } from 'src/todo/domain/todo-item';
import { TodoItemRepository } from '../../ports/todo-item/todo-item.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTodoItemQuery)
export class GetTodoItemQueryHandler
  implements IQueryHandler<GetTodoItemQuery>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}
  async execute(query: GetTodoItemQuery): Promise<TodoItem> {
    const todoItem = await this.todoItemRepository.findOne(query.id);

    if (!todoItem) {
      throw new Error(`item with id: ${query.id} not found`);
    }

    return todoItem;
  }
}
