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

  async createTodoList(
    createTodoListCommand: CreateTodoListCommand,
  ): Promise<any> {
    await this.commandBus.execute(createTodoListCommand);
  }

  async createTodoItem(
    createTodoItemCommand: CreateTodoItemCommand,
  ): Promise<any> {
    await this.commandBus.execute(createTodoItemCommand);
  }

  async updateTodoList(
    updateTodoListCommand: UpdateTodoListCommand,
  ): Promise<any> {
    await this.commandBus.execute(updateTodoListCommand);
  }

  async updateTodoItem(
    updateTodoItemCommand: UpdateTodoItemCommand,
  ): Promise<any> {
    await this.commandBus.execute(updateTodoItemCommand);
  }

  async deleteTodoList(
    deleteTodoListCommand: DeleteTodoListCommand,
  ): Promise<any> {
    await this.commandBus.execute(deleteTodoListCommand);
  }

  async deleteTodoItem(
    deleteTodoItemCommand: DeleteTodoItemCommand,
  ): Promise<any> {
    await this.commandBus.execute(deleteTodoItemCommand);
  }
}
