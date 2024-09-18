import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from '../user-interface/http/todo.controller';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
