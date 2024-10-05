import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from '../user-interface/http/todo.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Module({
  controllers: [TodoController],
  providers: [TodoService, CommandBus, QueryBus],
  exports: [TodoModule],
})
export class TodoModule {}
