import { Injectable } from '@nestjs/common';
import { IUpdateTodoItemParams } from 'src/todo/application/ports/todo-list/interfaces/update-todo-item-params.interface';
import { TodoItemRepository } from 'src/todo/application/ports/todo-list/todo-item.repository';
import { TodoItem } from 'src/todo/domain/todo-item';

@Injectable()
export class OrmTodoItemRepository implements TodoItemRepository {
  save(todoItem: TodoItem): TodoItem {}

  update(updateTodoItemsParams: IUpdateTodoItemParams): TodoItem {}

  findOne(id: string): TodoItem {}
}
