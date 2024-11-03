import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import { Version } from './object-value/version';
import {
  SerializableEvent,
  SerializedEventPayload,
} from '../events/interfaces/serializable-event';
import { AggregateSnapshotEvent } from '../events/aggregate-snapshot.event';
import { SnapshotThreshold } from './object-value/snapshot-threshold';

const VERSION = Symbol('version');

export class VersionedAggregateRoot extends AggregateRoot {
  public id: string;

  private [VERSION] = new Version(BigInt(-1));
  #snapshotThreshold = new SnapshotThreshold(5);

  get snapshotEvent() {
    return new AggregateSnapshotEvent(this);
  }

  get snapshotThreshold(): number {
    return this.#snapshotThreshold.value;
  }

  set snapshotThreshold(threshold: number) {
    this.#snapshotThreshold = new SnapshotThreshold(threshold);
  }

  apply(event: unknown, options?: unknown): void {
    if (typeof options === 'object') {
      super.apply(event, { skipHandler: true, ...options });
    } else if (typeof options === 'boolean') {
      super.apply(event, options);
    } else {
      super.apply(event, { skipHandler: true });
    }
  }

  loadFromHistory(history: SerializableEvent[]): void {
    const domainEvents = history.map((event) => event.data);
    super.loadFromHistory(domainEvents);

    const newVersion = history.at(-1).position;
    this.setVersion(new Version(newVersion));
  }

  get version(): Version {
    return this[VERSION];
  }

  private setVersion(version: Version): void {
    this[VERSION] = version;
  }

  [`on${AggregateSnapshotEvent.name}`](
    event: SerializedEventPayload<AggregateSnapshotEvent>,
  ) {
    Object.assign(this, event.aggregate);
  }
}
