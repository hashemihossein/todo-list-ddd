import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUpdateTodoItemParams } from 'src/todo/application/ports/todo-item/interfaces/update-todo-item-params.interface';
import { TodoItemRepository } from 'src/todo/application/ports/todo-item/todo-item.repository';
import { TodoItem } from 'src/todo/domain/todo-item';
import { TodoItemEntity } from '../entities/todo-item.entity';
import { Repository } from 'typeorm';
import { TodoItemMapper } from '../mappers/todo-item.mapper';

@Injectable()
export class OrmTodoItemRepository implements TodoItemRepository {
  constructor(
    @InjectRepository(TodoItemEntity)
    private readonly todoItemRepository: Repository<TodoItemEntity>,
  ) {}

  async save(todoItem: TodoItem): Promise<TodoItem> {
    const todoItemPersistence = TodoItemMapper.toPersistence(todoItem);
  }

  async update(
    updateTodoItemsParams: IUpdateTodoItemParams,
  ): Promise<TodoItem> {}

  async findOne(id: string): Promise<TodoItem> {}
}
