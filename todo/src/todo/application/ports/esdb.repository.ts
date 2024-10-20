import { EventBase } from 'src/todo/domain/events/event-base';

export abstract class ESDBRepository {
  abstract appendToStream(
    event: EventBase,
    expectedRevision?: 'any' | 'no_stream' | 'stream_exists',
  ): Promise<boolean>;
}
