import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoListReadRepository } from 'src/todo/application/ports/read-todo-list.repository';
import { TodoListReadModel } from 'src/todo/domain/read-models/todo-list.read-model';
import { ReadTodoList } from '../schemas/read-todo-list.schema';
import { Model } from 'mongoose';
import { TodoList } from 'src/todo/domain/todo-list';
import { ObjectId } from 'mongodb';
@Injectable()
export class OrmReadTodoListRepository implements TodoListReadRepository {
  constructor(
    @InjectModel(ReadTodoList.name)
    private readonly readTodoListRepository: Model<ReadTodoList>,
  ) {}

  async upsertList(
    todoList: Pick<TodoListReadModel, 'id'> & Partial<TodoListReadModel>,
  ): Promise<void> {
    await this.readTodoListRepository.findOneAndUpdate(
      { id: todoList.id },
      todoList,
      {
        upsert: true,
      },
    );
  }

  async readByListId(listId: string): Promise<TodoListReadModel> {
    const todoListReadModel = await this.readTodoListRepository.findOne({
      id: listId,
    });
    return todoListReadModel;
  }

  async deleteByListId(listId: string): Promise<void> {
    await this.readTodoListRepository.deleteOne({ id: listId });
  }
}
