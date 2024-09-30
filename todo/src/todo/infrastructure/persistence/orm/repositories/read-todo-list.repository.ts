import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReadTodoListRepository } from 'src/todo/application/ports/todo-list/read-todo-list.repository';
import { TodoListReadModel } from 'src/todo/domain/read-models/todo-list.read-model';
import { ReadTodoList } from '../schemas/read-todo-list.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrmReadTodoListRepository implements ReadTodoListRepository {
  constructor(
    @InjectModel(ReadTodoList.name)
    private readonly readTodoListRepository: Model<ReadTodoList>,
  ) {}

  async findOne(id: string): Promise<TodoListReadModel> {
    return await this.readTodoListRepository.findOne({ id });
  }

  async update(todoList: TodoListReadModel): Promise<void> {
    await this.readTodoListRepository.updateOne(
      { id: todoList.id },
      {
        ...todoList,
      },
    );
  }

  async save(todoList: TodoListReadModel): Promise<void> {
    await this.readTodoListRepository.create(todoList);
  }
}
