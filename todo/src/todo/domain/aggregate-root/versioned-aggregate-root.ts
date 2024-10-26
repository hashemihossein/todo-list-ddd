import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import { Version } from './object-value/version';
import { SerializableEvent } from '../events/interfaces/serializable-event';

const VERSION = Symbol('version');

export class VersionedAggregateRoot extends AggregateRoot {
  public id: string;

  private [VERSION] = new Version(0);

  loadFromHistory(history: SerializableEvent[]): void {
    const domainEvents = history.map((event) => event.data);
    super.loadFromHistory(domainEvents);
  }

  get version(): Version {
    return this[VERSION];
  }

  private setVersion(version: Version): void {
    this[VERSION] = version;
  }
}
