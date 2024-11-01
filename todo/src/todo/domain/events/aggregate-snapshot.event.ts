import { VersionedAggregateRoot } from '../aggregate-root/versioned-aggregate-root';
import { AutoWired } from './autowired-event.decorator';

@AutoWired
export class AggregateSnapshotEvent {
  constructor(readonly aggregate: VersionedAggregateRoot) {}
}
