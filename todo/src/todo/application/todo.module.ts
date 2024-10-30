import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListReadModelFactory } from '../domain/factories/todo-list-read-model.factory';
import { TodoListFactory } from '../domain/factories/todo-list.factory';
import { ESDBModule } from '../infrastructure/persistence/esdb/esdb.module';
import { OrmPersistenceModule } from '../infrastructure/persistence/orm/orm-persistence.module';
import { TodoController } from '../presenters/http/todo.controller';
import { CreateTodoItemCommandHandler } from './commands/handlers/create-todo-item.command-handler';
import { CreateTodoListCommandHandler } from './commands/handlers/create-todo-list.command-handler';
import { TodoListCreatedEventHandler } from './event-handlers/todo-list-created.event-handler';
import { TodoService } from './todo.service';
import { ESDBSubscription } from '../presenters/subscription/esdb/esdb-subscription';
import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { UpdateTodoListCommandHandler } from './commands/handlers/update-todo-list.command-handler';

@Module({
  imports: [CqrsModule, PersistenceModule],
  controllers: [TodoController, ESDBSubscription],
  providers: [
    TodoService,
    TodoListFactory,
    TodoListReadModelFactory,
    TodoListCreatedEventHandler,
    CreateTodoItemCommandHandler,
    CreateTodoListCommandHandler,
    UpdateTodoListCommandHandler,
  ],
  exports: [TodoModule],
})
export class TodoModule {}
