import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from '../udpate-todo-item.command';
import { TodoItem } from 'src/todo/domain/todo-item';
import { TodoItemRepository } from '../../ports/todo-item/todo-item.repository';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemCommandHandler
  implements ICommandHandler<UpdateTodoItemCommand>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}
  async execute(command: UpdateTodoItemCommand): Promise<TodoItem> {
    const todoItem = this.todoItemRepository.findOne(command.id);
    if (!todoItem) {
      throw new Error(`todo item with id of ${command.id} is unavailable`);
    }
    if (command)
      //todo: handling logic in here or domain services
      return await this.todoItemRepository.update(command);
  }
}

/*
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from '../udpate-todo-item.command';
import { TodoItem } from 'src/todo/domain/todo-item';
import { TodoItemRepository } from '../../ports/todo-item/todo-item.repository';
import { TodoItemFactory } from 'src/todo/domain/factories/todo-item.factory';
import { TodoItemPriority } from 'src/todo/domain/value-objects/todo-item-priority';
import { TodoItemState } from 'src/todo/domain/value-objects/todo-item-state';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemCommandHandler
  implements ICommandHandler<UpdateTodoItemCommand>
{
  constructor(
    private readonly todoItemRepository: TodoItemRepository,
    private readonly todoItemFactory: TodoItemFactory,
  ) {}
  async execute(command: UpdateTodoItemCommand): Promise<TodoItem> {
    let params = {
      priority: null,
      state: null,
    };
    if (command?.priority) {
      params.priority = new TodoItemPriority(
        command.priority as TodoItemPriority['value'],
      );
    }
    if (command?.state) {
      params.state = new TodoItemState(command.state as TodoItemState['value']);
    }
    return await this.todoItemRepository.update({
      ...command,
      priority: params?.priority,
      state: params?.state,
    });
  }
}
*/
