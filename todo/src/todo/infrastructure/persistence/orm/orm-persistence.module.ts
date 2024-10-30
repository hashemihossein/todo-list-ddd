import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ReadTodoList,
  ReadTodoListSchema,
} from './schemas/read-todo-list.schema';
import { ReadTodoListRepository } from 'src/todo/application/ports/todo-list/read-todo-list.repository';
import { OrmReadTodoListRepository } from './repositories/read-todo-list.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReadTodoList.name, schema: ReadTodoListSchema },
    ]),
  ],
  providers: [
    {
      provide: ReadTodoListRepository,
      useClass: OrmReadTodoListRepository,
    },
  ],
  exports: [ReadTodoListRepository],
})
export class OrmPersistenceModule {}
