import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListReadRepository } from '../ports/read-todo-list.repository';
import { TodoItemCreatedEvent } from 'src/todo/domain/events/todo-item/todo-item-created.event';
import { TodoListReadModel } from 'src/todo/domain/read-models/todo-list.read-model';
import { SerializedEventPayload } from 'src/todo/domain/events/interfaces/serializable-event';

@EventsHandler(TodoItemCreatedEvent)
export class TodoItemCreatedEventHandler
  implements IEventHandler<SerializedEventPayload<TodoItemCreatedEvent>>
{
  constructor(
    private readonly readTodoListRespository: TodoListReadRepository,
  ) {}

  async handle(event: SerializedEventPayload<TodoItemCreatedEvent>) {
    let todoListReadModel = await this.readTodoListRespository.readByListId(
      event.todoItem.listId,
    );

    if (!todoListReadModel) {
      // here we should create a record for TodoList in our read db, because the read db is not our source of truth!
    }

    todoListReadModel.items.push({
      id: event.todoItem.id,
      title: event.todoItem.title,
      description: event.todoItem.description,
      listId: event.todoItem.listId,
      priority: event.todoItem.priority,
      state: event.todoItem.state,
      estimatedTime: event.todoItem.estimatedTime,
      loggedTime: event.todoItem.loggedTime,
    });

    this.readTodoListRespository.upsertList(todoListReadModel);
  }
}
