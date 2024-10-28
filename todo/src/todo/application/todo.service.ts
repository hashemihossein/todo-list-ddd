import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './commands/create-todo-list.command';
import { CreateTodoItemCommand } from './commands/create-todo-item.command';
import { UpdateTodoListCommand } from './commands/udpate-todo-list.command';
import { UpdateTodoItemCommand } from './commands/udpate-todo-item.command';
import { DeleteTodoListCommand } from './commands/delete-todo-list.command';
import { DeleteTodoItemCommand } from './commands/delete-todo-item.command';
import { TodoList } from '../domain/todo-list';
import { TodoItem } from '../domain/todo-item';
import { PersistentSubscriptionToStreamResolvedEvent } from '@eventstore/db-client';
import { EventDeserializer } from '../infrastructure/persistence/esdb/deserializers/event.deserializer';
import { RecievedEventType } from '../infrastructure/persistence/esdb/types/received-event.type';
import { SerializableEvent } from '../domain/events/interfaces/serializable-event';

@Injectable()
export class TodoService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventDeserializer: EventDeserializer,
    private readonly eventBus: EventBus,
  ) {}

  async publishSubscriptionEvents(event: RecievedEventType): Promise<void> {
    console.log(2);
    const deserializedEvent: SerializableEvent =
      this.eventDeserializer.deserialize(event);
    this.eventBus.subject$.next(deserializedEvent.data);
  }

  async createTodoList(
    createTodoListCommand: CreateTodoListCommand,
  ): Promise<TodoList> {
    return await this.commandBus.execute(createTodoListCommand);
  }

  async createTodoItem(
    createTodoItemCommand: CreateTodoItemCommand,
  ): Promise<TodoItem> {
    return await this.commandBus.execute(createTodoItemCommand);
  }

  async updateTodoList(
    updateTodoListCommand: UpdateTodoListCommand,
  ): Promise<TodoList> {
    return await this.commandBus.execute(updateTodoListCommand);
  }

  async updateTodoItem(
    updateTodoItemCommand: UpdateTodoItemCommand,
  ): Promise<TodoItem> {
    return await this.commandBus.execute(updateTodoItemCommand);
  }

  async deleteTodoList(
    deleteTodoListCommand: DeleteTodoListCommand,
  ): Promise<TodoList> {
    return await this.commandBus.execute(deleteTodoListCommand);
  }

  async deleteTodoItem(
    deleteTodoItemCommand: DeleteTodoItemCommand,
  ): Promise<TodoItem> {
    return await this.commandBus.execute(deleteTodoItemCommand);
  }
}
