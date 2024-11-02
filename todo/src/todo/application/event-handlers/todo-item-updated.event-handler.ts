import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListReadRepository } from '../ports/todo-list/read-todo-list.repository';
import { SerializedEventPayload } from 'src/todo/domain/events/interfaces/serializable-event';
import { TodoItemUpdatedEvent } from 'src/todo/domain/events/todo-item/todo-item-updated.event';

@EventsHandler(TodoItemUpdatedEvent)
export class TodoItemUpdatedEventHandler
  implements IEventHandler<SerializedEventPayload<TodoItemUpdatedEvent>>
{
  constructor(
    private readonly readTodoListRespository: TodoListReadRepository,
  ) {}

  async handle(event: SerializedEventPayload<TodoItemUpdatedEvent>) {
    const todoList = await this.readTodoListRespository.read(event.todoItem.listId)

    if ( !todoList ) {
      // here we should create a record for TodoList in our read db, because the read db is not our source of truth!
    }

    const itemIndex = todoList.items.findIndex((item) => item.id == event.todoItem.listId)
    if ( itemIndex == -1 ) {
        todoList.items.push(event.todoItem)
    } else {
        todoList.items[itemIndex] = event.todoItem
    }

    this.readTodoListRespository.upsert(todoList)
  }
}
