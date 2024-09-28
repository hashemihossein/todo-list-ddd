import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './commands/create-todo-list.command';
import { CreateTodoItemCommand } from './commands/create-todo-item.command';
import { UpdateTodoListCommand } from './commands/udpate-todo-list.command';
import { UpdateTodoItemCommand } from './commands/udpate-todo-item.command';
import { DeleteTodoListCommand } from './commands/delete-todo-list.command';
import { DeleteTodoItemCommand } from './commands/delete-todo-item.command';

@Injectable()
export class TodoService {
  constructor(private readonly commandBus: CommandBus) {}
  // todo: functions output type
  createTodoList(createTodoListCommand: CreateTodoListCommand) {
    this.commandBus.execute(createTodoListCommand);
  }

  createTodoItem(createTodoItemCommand: CreateTodoItemCommand) {
    this.commandBus.execute(createTodoItemCommand);
  }

  updateTodoList(updateTodoListCommand: UpdateTodoListCommand) {
    this.commandBus.execute(updateTodoListCommand);
  }

  updateTodoItem(updateTodoItemCommand: UpdateTodoItemCommand) {
    this.commandBus.execute(updateTodoItemCommand);
  }

  deleteTodoList(deleteTodoListCommand: DeleteTodoListCommand) {
    this.commandBus.execute(deleteTodoListCommand);
  }

  deleteTodoItem(deleteTodoItemCommand: DeleteTodoItemCommand) {
    this.commandBus.execute(deleteTodoItemCommand);
  }
}
