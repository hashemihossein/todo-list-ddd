import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReadTodoListRepository } from 'src/todo/application/ports/todo-list/read-todo-list.repository';
import { TodoListReadModel } from 'src/todo/domain/read-models/todo-list.read-model';
import { ReadTodoList } from '../schemas/read-todo-list.schema';
import { Model } from 'mongoose';
import { TodoList } from 'src/todo/domain/todo-list';
import { ObjectId } from 'mongodb';
@Injectable()
export class OrmReadTodoListRepository implements ReadTodoListRepository {
  constructor(
    @InjectModel(ReadTodoList.name)
    private readonly readTodoListRepository: Model<ReadTodoList>,
  ) {}
  async upsert(
    todoList: Pick<TodoList, 'id'> & Partial<TodoList>,
  ): Promise<TodoListReadModel> {
    console.dir(todoList, { depth: Infinity });
    const upsertedTodoList = await this.readTodoListRepository.findOneAndUpdate(
      { id: todoList.id },
      todoList,
      {
        upsert: true,
      },
    );

    return upsertedTodoList;
  }
}
