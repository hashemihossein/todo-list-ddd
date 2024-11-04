import {
  EventStoreDBClient,
  FORWARDS,
  JSONEventType,
  PersistentSubscriptionToStream,
  persistentSubscriptionToStreamSettingsFromDefaults,
  START,
} from '@eventstore/db-client';
import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/todo/infrastructure/in-memory/redis/redis.service';

@Injectable()
export class ESDBCoreService {
  private client: EventStoreDBClient;
  // private connectionString = `esdb://eventstore:2113?tls=false`;
  private connectionString = `esdb://${this.configService.get<string>('ESDB_HOST', 'localhost')}:${this.configService.get<string>('ESDB_PORT', '2113')}?tls=false`;

  private readonly logger = new Logger(ESDBCoreService.name);
  private retryOnSubscription = 3;

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
      throw new ServiceUnavailableException(
        `error while subscribing to stream: ${error}`,
      );
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
        try {
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
        } catch (error) {
          if (this.retryOnSubscription > 0) {
            await this.client.deletePersistentSubscriptionToStream(
              streamName,
              `persistent-subscription-to${streamName}-stream`,
            );
            this.retryOnSubscription--;
            return this._getSubscriptionGroupName(streamName);
          } else {
            throw new ServiceUnavailableException(
              `Error on creating persistent subscription to stream: ${streamName}`,
            );
          }
        }
      }
      return groupName;
    } catch (error) {
      this.logger.error(error);
      throw new ServiceUnavailableException(
        `error while getting subscribing group name: ${error}`,
      );
    }
  }
}
