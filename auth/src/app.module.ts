import { Module } from '@nestjs/common';
import { AppController } from './presenters/http/app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth-client', // for specifying that who publish message
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'client',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
