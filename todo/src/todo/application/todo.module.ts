import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListReadModelFactory } from '../domain/factories/todo-list-read-model.factory';
import { TodoListFactory } from '../domain/factories/todo-list.factory';
import { OrmPersistenceModule } from '../infrastructure/persistence/orm/orm-persistence.module';
import { TodoController } from '../user-interface/http/todo.controller';
import { TodoListCreatedEventHandler } from './event-handlers/todo-list-created.event-handler';
import { TodoService } from './todo.service';

@Module({
  imports: [CqrsModule, OrmPersistenceModule],
  controllers: [TodoController],
  providers: [
    TodoService,
    TodoListFactory,
    TodoListReadModelFactory,
    TodoListCreatedEventHandler,
  ],
  exports: [TodoModule],
})
export class TodoModule {}
