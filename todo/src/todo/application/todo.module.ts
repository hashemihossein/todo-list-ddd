import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from '../user-interface/http/todo.controller';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommandHandler } from './commands/handlers/create-todo-list.command-handler';
import { TodoListFactory } from '../domain/factories/todo-list.factory';
import { OrmPersistenceModule } from '../infrastructure/persistence/orm/orm-persistence.module';

@Module({
  imports: [CqrsModule, OrmPersistenceModule],
  controllers: [TodoController],
  providers: [TodoService, CreateTodoListCommandHandler, TodoListFactory],
  exports: [TodoModule],
})
export class TodoModule {}
