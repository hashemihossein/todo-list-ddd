import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './commands/create-todo-list.command';
import { CreateTodoItemCommand } from './commands/create-todo-item.command';
import { UpdateTodoListCommand } from './commands/udpate-todo-list.command';
import { UpdateTodoItemCommand } from './commands/udpate-todo-item.command';

@Injectable()
export class TodoService {
  constructor(private readonly commandBus: CommandBus) {}
  // todo: functions output type
  createTodoList(createTodoListCommand: CreateTodoListCommand) {
    this.commandBus.execute(createTodoListCommand);
  }

  createTodoItem(createTodoItem: CreateTodoItemCommand) {
    this.commandBus.execute(createTodoItem);
  }

  updateTodoList(updateTodoList: UpdateTodoListCommand) {
    this.commandBus.execute(updateTodoList);
  }

  updateTodoItem(updateTodoItem: UpdateTodoItemCommand) {
    this.commandBus.execute(updateTodoItem);
  }
}
