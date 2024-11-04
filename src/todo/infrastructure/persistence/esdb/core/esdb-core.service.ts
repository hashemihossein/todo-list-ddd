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
  // private connectionString = `esdb://eventstore:2113?tls=false`;
  private connectionString = `esdb://${this.configService.get<string>('ESDB_HOST', 'localhost')}:${this.configService.get<string>('ESDB_PORT', '2113')}?tls=false`;

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
      let groupName = await this.redisService.get(
        `${streamName}-subsubscription-name`,
      );
      if (!groupName) {
        await this.client.createPersistentSubscriptionToStream(
          streamName,
          `persistent-subscription-to${streamName}-stream`,
          persistentSubscriptionToStreamSettingsFromDefaults({
            resolveLinkTos: true,
          }),
        );
        groupName = `persistent-subscription-to${streamName}-stream`;
        await this.redisService.set(
          `${streamName}-subsubscription-name`,
          `persistent-subscription-to${streamName}-stream`,
        );
      }
      return groupName;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`error while getting subscribing group name: ${error}`);
    }
  }
}
