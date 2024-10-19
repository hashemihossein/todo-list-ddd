import { TodoItemEvent } from 'src/todo/domain/events/todo-item';

export abstract class WriteTodoitemRepository {
  abstract appendToStream(
    event: TodoItemEvent,
    expectedRevision?: 'any' | 'no_stream' | 'stream_exists',
  ): Promise<void>;
}
