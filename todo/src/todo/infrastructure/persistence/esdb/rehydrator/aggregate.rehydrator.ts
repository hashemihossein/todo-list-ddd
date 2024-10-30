import { Injectable, Type } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { VersionedAggregateRoot } from 'src/todo/domain/aggregate-root/versioned-aggregate-root';
import { ESDBWriteRepository } from '../repositories/esdb-write.repository';

@Injectable()
export class AggregateRehydrator {
  constructor(
    private readonly esdbWriteRepository: ESDBWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async rehydrate<T extends VersionedAggregateRoot>(
    aggregateId: string,
    aggregateCls: Type<T>,
  ): Promise<T> {
    const streamId = `${aggregateCls.constructor.name}-${aggregateId}`;
    const events =
      await this.esdbWriteRepository.readEventsFromStream(streamId);
    console.log(111, ':D:D:');

    for await (const event of events) {
      console.log(event, ':D:D:');
    }
    console.log(222, ':D:D:');

    const AggregateClsWithDispatcher =
      this.eventPublisher.mergeClassContext(aggregateCls);

    const aggregate = new AggregateClsWithDispatcher(aggregateId);

    // aggregate.loadFromHistory(events);

    return aggregate;
  }
}
