import {
  EventStoreDBClient,
  FORWARDS,
  JSONEventType,
  PersistentSubscriptionToStream,
  persistentSubscriptionToStreamSettingsFromDefaults,
  START,
} from '@eventstore/db-client';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/todo/infrastructure/in-memory/redis/redis.service';

@Injectable()
export class ESDBCoreService {
  private client: EventStoreDBClient;
  private connectionString = `esdb://eventstore:2113?tls=false`;
  // private connectionString = `esdb://127.0.0.1:2113?tls=false`;

  private readonly logger = new Logger(ESDBCoreService.name);
  private reconnecting = false;

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this._connect();
  }

  async onModuleInit() {
    this.logger.log('Connecting to EventStoreDB...');
    await this._connect();
    this.logger.log('Connected to EventStoreDB');
  }

  public getClient(): EventStoreDBClient {
    return this.client;
  }

  async connectToPersistentSubscription(
    streamName: string,
  ): Promise<PersistentSubscriptionToStream> {
    try {
      const subName = await this._getSubscriptionGroupName(streamName);
      const subscritption =
        this.client.subscribeToPersistentSubscriptionToStream<JSONEventType>(
          streamName,
          subName,
        );
      return subscritption;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`error while subscribing to stream: ${error}`);
    }
  }

  private async _connect() {
    this.client = EventStoreDBClient.connectionString(this.connectionString);
  }

  private async _getSubscriptionGroupName(streamName: string): Promise<string> {
    try {
      let groupName = await this.redisService.get(`${streamName}-sub-name`);
      if (!groupName) {
        await this.client.createPersistentSubscriptionToStream(
          streamName,
          `PersistentSubscriptionTo${streamName}Stream`,
          persistentSubscriptionToStreamSettingsFromDefaults(),
        );
        groupName = `PersistentSubscriptionTo${streamName}Stream`;
        await this.redisService.set(
          `${streamName}-sub-name`,
          `PersistentSubscriptionTo${streamName}Stream`,
        );
      }
      return groupName;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`error while getting subscribing group name: ${error}`);
    }
  }
}
