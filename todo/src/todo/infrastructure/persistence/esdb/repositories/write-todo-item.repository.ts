import {
  ANY,
  EventStoreDBClient,
  FORWARDS,
  jsonEvent,
  START,
} from '@eventstore/db-client';
import { WriteTodoitemRepository } from 'src/todo/application/ports/todo-item/write-todo-item.repository';
import { TodoItemEvent } from 'src/todo/domain/events/todo-item';
import { ESDBConfigService } from '../config/esdb-config.service';
import { TodoItemEventMapper } from '../mappers/todo-item.mapper';
import { randomUUID } from 'crypto';

export class ESDBWriteTodoItemRepository extends WriteTodoitemRepository {
  private readonly client: EventStoreDBClient;
  constructor(private readonly esdbConfigService: ESDBConfigService) {
    super();
    this.client = esdbConfigService.getClient();
  }

  async appendToStream(event: TodoItemEvent): Promise<void> {
    const mappedEvent = TodoItemEventMapper.toPersistence(event);
    await this.client.appendToStream(
      `TodoItem-${mappedEvent.id}`,
      mappedEvent,
      {
        expectedRevision: ANY,
      },
    );
  }
}
