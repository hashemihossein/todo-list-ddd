import { VersionedAggregateRoot } from 'src/todo/domain/aggregate-root/versioned-aggregate-root';
import { SerializableEvent } from 'src/todo/domain/events/interfaces/serializable-event';

export abstract class ESDBRepository {
  abstract appendToStream(
    event: SerializableEvent | SerializableEvent[],
  ): Promise<boolean>;
}
