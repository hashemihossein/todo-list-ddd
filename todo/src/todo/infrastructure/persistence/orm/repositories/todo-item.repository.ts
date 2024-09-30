import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const persistenceModel = TodoItemMapper.toPersistence(todoItem);
    const newEntity = await this.todoItemRepository.save(persistenceModel);
    return TodoItemMapper.toDomain(newEntity);
  }

  async update(todoItem: TodoItem): Promise<TodoItem> {
    const newEntity = await this.todoItemRepository.save(
      TodoItemMapper.toPersistence(todoItem),
    );

    return TodoItemMapper.toDomain(newEntity);
  }

  async findOne(id: string): Promise<TodoItem> {
    if (!id) {
      throw new Error('id is required');
    }

    const todoItem = await this.todoItemRepository.findOne({ where: { id } });
    return TodoItemMapper.toDomain(todoItem);
  }

  async delete(id: string): Promise<TodoItem> {
    const todoItem = await this.findOne(id);

    await this.todoItemRepository.delete(id);
    return todoItem;
  }
}
