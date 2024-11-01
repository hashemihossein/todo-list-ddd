import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListReadRepository } from '../ports/todo-list/read-todo-list.repository';
import { TodoItemCreatedEvent } from 'src/todo/domain/events/todo-item/todo-item-created.event';
import { TodoListReadModel } from 'src/todo/domain/read-models/todo-list.read-model';

@EventsHandler(TodoItemCreatedEvent)
export class TodoItemCreatedEventHandler
  implements IEventHandler<TodoItemCreatedEvent>
{
  constructor(
    private readonly readTodoListRespository: TodoListReadRepository,
  ) {}

  async handle(event: TodoItemCreatedEvent) {
    let todoListReadModel = await this.readTodoListRespository.read(
      event.todoItem.listId,
    );

    if (!todoListReadModel) {
      // here we should create a record for TodoList in our read db, because our read db in not our source of truth!
    }

    todoListReadModel.items.push({
      id: event.todoItem.id,
      title: event.todoItem.title,
      description: event.todoItem.description,
      listId: event.todoItem.listId,
      priority: event.todoItem.priority.value,
      state: event.todoItem.state.value,
      estimatedTime: event.todoItem.estimatedTime,
      loggedTime: event.todoItem.loggedTime,
    });

    await this.readTodoListRespository.upsert(todoListReadModel);
  }
}
