import {
  EventType,
  PARK,
  PersistentSubscriptionToStream,
  PersistentSubscriptionToStreamResolvedEvent,
  persistentSubscriptionToStreamSettingsFromDefaults,
} from '@eventstore/db-client';
import { Controller, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { TodoService } from 'src/todo/application/todo.service';
import { ESDBCoreService } from 'src/todo/infrastructure/persistence/esdb/core/esdb-core.service';

@Controller()
export class ESDBSubscription implements OnModuleInit, OnModuleDestroy {
  todoListSubscription: PersistentSubscriptionToStream;
  todoItemSubscription: PersistentSubscriptionToStream;

  constructor(
    private readonly esdbCoreService: ESDBCoreService,
    private readonly todoService: TodoService,
  ) {}

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
            if (
              event.event.data instanceof Uint8Array ||
              event.event?.isJson === false
            ) {
              throw new Error('incorrect event type!');
            }
            console.log(1);
            await this.todoService.publishSubscriptionEvents(event.event);
            await subscription.ack(event);
          } catch (error) {
            await subscription.nack(PARK, error.toString(), event);
            console.error(error);
          }
        }
      } catch (error) {
        await this.setupSubscriptions();
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
