import {
  EventStoreDBClient,
  JSONEventType,
  PersistentSubscriptionToStream,
  persistentSubscriptionToStreamSettingsFromDefaults,
} from '@eventstore/db-client';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/todo/infrastructure/in-memory/redis/redis.service';

@Injectable()
export class ESDBConfigService {
  private client: EventStoreDBClient;
  private connectionString = `esdb+discover://admin:${this.configService.get<string>('EVENTSTORE_USER')}:${this.configService.get<string>('EVENTSTORE_PASSWORD')}@cluster.dns.name:${this.configService.get<number>('EVENTSTORE_PORT')}`;
  private readonly logger = new Logger(ESDBConfigService.name);
  private reconnecting = false;

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this.client = new EventStoreDBClient(
      { endpoint: 'localhost:2113' },
      { insecure: true },
    );
  }

  async onModuleInit() {
    this.logger.log('Connecting to EventStoreDB...');
    await this._connect();
    this.logger.log('Connected to EventStoreDB');
  }

  public getClient(): EventStoreDBClient {
    return this.client;
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
          {
            credentials: {
              username: this.configService.get<string>('EVENTSTORE_USER'),
              password: this.configService.get<string>('EVENTSTORE_PASSWORD'),
            },
          },
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
}
