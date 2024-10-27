import { PARK, PersistentSubscriptionToStream } from '@eventstore/db-client';
import { Controller, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ESDBCoreService } from 'src/todo/infrastructure/persistence/esdb/core/esdb-core.service';

@Controller()
export class ESDBSubscription implements OnModuleInit, OnModuleDestroy {
  todoListSubscription: PersistentSubscriptionToStream;
  todoItemSubscription: PersistentSubscriptionToStream;

  constructor(private readonly esdbCoreService: ESDBCoreService) {}

  async onModuleInit() {
    await this.setupSubscriptions();
  }

  async onModuleDestroy() {
    await this.cleanupSubscriptions();
  }

  private async setupSubscriptions() {
    this.todoListSubscription =
      await this.esdbCoreService.connectToPersistentSubscription(
        '$ce-TodoList',
      );

    this.todoItemSubscription =
      await this.esdbCoreService.connectToPersistentSubscription(
        '$ce-TodoItem',
      );

    this.handleSubscription(this.todoItemSubscription);
    this.handleSubscription(this.todoListSubscription);
  }

  private async handleSubscription(
    subscription: PersistentSubscriptionToStream,
  ) {
    (async () => {
      try {
        for await (const event of subscription) {
          try {
            console.log(event.event.data);
            await subscription.ack(event);
          } catch (error) {
            await subscription.nack(PARK, error.toString(), event);
          }
        }
      } catch (error) {
        // Implement reconnection logic here
      }
    })();
  }

  private async cleanupSubscriptions() {
    if (this.todoListSubscription) {
      await this.todoListSubscription.unsubscribe();
    }
    if (this.todoItemSubscription) {
      await this.todoItemSubscription.unsubscribe();
    }
  }
}
