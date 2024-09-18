import { Injectable } from '@nestjs/common';
import { CreateTodoListCommand } from './commands/create-todo-list.command';

@Injectable()
export class TodoService {
  createTodoList(createTodoListCommand: CreateTodoListCommand) {
    return null;
  }
}
