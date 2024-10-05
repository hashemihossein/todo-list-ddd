import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListEntity } from './entities/todo-list.entity';
import { TodoItemEntity } from './entities/todo-item.entity';
import { TodoItemRepository } from 'src/todo/application/ports/todo-item/todo-item.repository';
import { WriteTodoListRepository } from 'src/todo/application/ports/todo-list/write-todo-list.repository';
import { OrmWriteTodoListRepository } from './repositories/write-todo-list.repository';
import { OrmTodoItemRepository } from './repositories/todo-item.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ReadTodoList,
  ReadTodoListSchema,
} from './schemas/read-todo-list.schema';
import { ReadTodoListRepository } from 'src/todo/application/ports/todo-list/read-todo-list.repository';
import { OrmReadTodoListRepository } from './repositories/read-todo-list.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoListEntity, TodoItemEntity]),
    MongooseModule.forFeature([
      { name: ReadTodoList.name, schema: ReadTodoListSchema },
    ]),
  ],
  providers: [
    {
      provide: WriteTodoListRepository,
      useClass: OrmWriteTodoListRepository,
    },
    {
      provide: TodoItemRepository,
      useClass: OrmTodoItemRepository,
    },
    {
      provide: ReadTodoListRepository,
      useClass: OrmReadTodoListRepository,
    },
  ],
  exports: [
    WriteTodoListRepository,
    TodoItemRepository,
    ReadTodoListRepository,
  ],
})
export class OrmPersistenceModule {}
