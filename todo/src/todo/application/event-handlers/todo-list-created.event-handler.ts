import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListCreatedEvent } from 'src/todo/domain/events/todo-list/todo-list-created.event';
import { ESDBRepository } from '../ports/esdb.repository';

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedEventHandler
  implements IEventHandler<TodoListCreatedEvent>
{
  constructor(private readonly esdbRepository: ESDBRepository) {}

  async handle(event: TodoListCreatedEvent) {
    await this.esdbRepository.appendToStream(event);
  }
}
