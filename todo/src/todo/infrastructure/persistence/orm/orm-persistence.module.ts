import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListEntity } from './entities/todo-list.entity';
import { TodoItemEntity } from './entities/todo-item.entity';
import { TodoItemRepository } from 'src/todo/application/ports/todo-item/todo-item.repository';
import { WriteTodoListRepository } from 'src/todo/application/ports/todo-list/write-todo-list.repository';
import { OrmWriteTodoListRepository } from './repositories/write-todo-list.repository';
import { OrmTodoItemRepository } from './repositories/todo-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TodoListEntity, TodoItemEntity])],
  providers: [
    {
      provide: WriteTodoListRepository,
      useClass: OrmWriteTodoListRepository,
    },
    {
      provide: TodoItemRepository,
      useClass: OrmTodoItemRepository,
    },
  ],
  exports: [WriteTodoListRepository, TodoItemRepository],
})
export class AppModule {}
