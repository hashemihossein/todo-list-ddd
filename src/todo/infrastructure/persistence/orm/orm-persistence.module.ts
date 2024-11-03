import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ReadTodoList,
  ReadTodoListSchema,
} from './schemas/read-todo-list.schema';
import { TodoListReadRepository } from 'src/todo/application/ports/read-todo-list.repository';
import { OrmReadTodoListRepository } from './repositories/read-todo-list.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReadTodoList.name, schema: ReadTodoListSchema },
    ]),
  ],
  providers: [
    {
      provide: TodoListReadRepository,
      useClass: OrmReadTodoListRepository,
    },
  ],
  exports: [TodoListReadRepository],
})
export class OrmPersistenceModule {}
