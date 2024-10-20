import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListReadModelFactory } from '../domain/factories/todo-list-read-model.factory';
import { TodoListFactory } from '../domain/factories/todo-list.factory';
import { ESDBModule } from '../infrastructure/persistence/esdb/esdb.module';
import { OrmPersistenceModule } from '../infrastructure/persistence/orm/orm-persistence.module';
import { TodoController } from '../user-interface/http/todo.controller';
import { CreateTodoItemCommandHandler } from './commands/handlers/create-todo-item.command-handler';
import { CreateTodoListCommandHandler } from './commands/handlers/create-todo-list.command-handler';
import { TodoListCreatedEventHandler } from './event-handlers/todo-list-created.event-handler';
import { TodoService } from './todo.service';

@Module({
  imports: [CqrsModule, OrmPersistenceModule, ESDBModule],
  controllers: [TodoController],
  providers: [
    TodoService,
    TodoListFactory,
    TodoListReadModelFactory,
    TodoListCreatedEventHandler,
    CreateTodoItemCommandHandler,
    CreateTodoListCommandHandler,
  ],
  exports: [TodoModule],
})
export class TodoModule {}
