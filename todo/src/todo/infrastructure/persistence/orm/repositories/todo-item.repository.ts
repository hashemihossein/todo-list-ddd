import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUpdateTodoItemParams } from 'src/todo/application/ports/todo-item/interfaces/update-todo-item-params.interface';
import { TodoItemRepository } from 'src/todo/application/ports/todo-item/todo-item.repository';
import { TodoItem } from 'src/todo/domain/todo-item';
import { TodoItemEntity } from '../entities/todo-item.entity';
import { Repository } from 'typeorm';
import { TodoItemMapper } from '../mappers/todo-item.mapper';
import { TodoItemPriority } from 'src/todo/domain/value-objects/todo-item-priority';
import { TodoItemState } from 'src/todo/domain/value-objects/todo-item-state';

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

  async update(
    updateTodoItemsParams: IUpdateTodoItemParams,
  ): Promise<TodoItem> {
    if (!updateTodoItemsParams?.id) {
      throw new Error('id is required');
    }

    const todoItem = await this.findOne(updateTodoItemsParams.id);
    if (updateTodoItemsParams?.description) {
      todoItem.description = updateTodoItemsParams.description;
    }
    if (updateTodoItemsParams?.estimatedTime) {
      todoItem.estimatedTime = updateTodoItemsParams.estimatedTime;
    }
    if (updateTodoItemsParams?.loggedTime) {
      todoItem.loggedTime = updateTodoItemsParams.loggedTime;
    }
    if (updateTodoItemsParams?.title) {
      todoItem.title = updateTodoItemsParams.title;
    }
    if (updateTodoItemsParams?.priority) {
      const newPriority = new TodoItemPriority(
        updateTodoItemsParams.priority as TodoItemPriority['value'],
      );
      todoItem.priority = newPriority;
    }
    if (updateTodoItemsParams?.state) {
      const newState = new TodoItemState(
        updateTodoItemsParams.state as TodoItemState['value'],
      );
      todoItem.state = newState;
    }

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
}
