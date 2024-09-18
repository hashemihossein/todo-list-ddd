import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUpdateTodoListParams } from 'src/todo/application/ports/todo-list/interfaces/update-todo-list-params.interface';
import { WriteTodoListRepository } from 'src/todo/application/ports/todo-list/write-todo-list.repository';
import { TodoList } from 'src/todo/domain/todo-list';
import { TodoListEntity } from '../entities/todo-list.entity';
import { Repository } from 'typeorm';
import { TodoListMapper } from '../mappers/todo-list.mapper';

@Injectable()
export class OrmWriteTodoListRepository implements WriteTodoListRepository {
  constructor(
    @InjectRepository(TodoListEntity)
    private readonly todoListRepository: Repository<TodoListEntity>,
  ) {}

  async save(todoList: TodoList): Promise<TodoList> {
    const persistenceModel = TodoListMapper.toPersistence(todoList);
    const newEntity = await this.todoListRepository.save(persistenceModel);
    return TodoListMapper.toDomain(newEntity);
  }

  async update(
    updateTodoListParams: IUpdateTodoListParams,
  ): Promise<TodoList> {}
}
