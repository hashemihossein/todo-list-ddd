import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoItemCommand } from '../create-todo-item.command';
import { TodoItemFactory } from 'src/todo/domain/factories/todo-item.factory';
import { TodoItem } from 'src/todo/domain/todo-item';
import { AggregateRehydrator } from 'src/todo/infrastructure/persistence/esdb/rehydrator/aggregate.rehydrator';
import { TodoList } from 'src/todo/domain/todo-list';
import { ItemAddedToListEvent } from 'src/todo/domain/events/todo-list/item-added-to-list.event';
import { TodoItemCreatedEvent } from 'src/todo/domain/events/todo-item/todo-item-created.event';

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemCommandHandler
  implements ICommandHandler<CreateTodoItemCommand>
{
  constructor(
    private readonly aggregateRehydrator: AggregateRehydrator,
    private readonly eventPublisher: EventPublisher,
    private readonly todoItemFactory: TodoItemFactory,
  ) {}
  async execute(command: CreateTodoItemCommand): Promise<TodoItem> {
    const todoList = await this.aggregateRehydrator.rehydrate(
      command.listId,
      TodoList,
    );

    if (!todoList) {
      throw new Error(`ther is no todo list with id: ${command.listId}`);
    }

    const todoItem = this.todoItemFactory.create(
      command.title,
      command.description,
      command.listId,
      command.priority,
      command.estimatedTime,
    );
    todoList.items.push(todoItem.id);

    todoList.apply(new ItemAddedToListEvent({ id: todoItem.id }));
    todoItem.apply(new TodoItemCreatedEvent(todoItem));

    this.eventPublisher.mergeObjectContext(todoList);
    this.eventPublisher.mergeObjectContext(todoItem);

    todoItem.commit();
    todoList.commit();

    return todoItem;
  }
}
