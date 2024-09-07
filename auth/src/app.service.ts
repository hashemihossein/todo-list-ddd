import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserEvent } from './create-user.event';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientKafka) {}
  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('create_user');
    await this.client.connect();
  }

  async signup(createUserDto: CreateUserDto) {
    return await firstValueFrom(
      this.client.send(
        'create_user',
        new CreateUserEvent(
          createUserDto.username,
          createUserDto.email,
          createUserDto.password,
        ),
      ),
    );
  }
}
