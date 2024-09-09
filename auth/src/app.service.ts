import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserEvent } from './create-user.event';
import { RegisterDto } from './presenters/http/dto/register.dto';
import { LoginDto } from './presenters/http/dto/login.dto';

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

  async register(registerDto: RegisterDto) {
    return await firstValueFrom(
      this.client.send(
        'create_user',
        new CreateUserEvent(
          registerDto.username,
          registerDto.email,
          registerDto.password,
        ),
      ),
    );
  }

  async login(loginDto: LoginDto) {
    return await firstValueFrom(
      this.client.send(
        'create_user',
        // must contain login command creator
      ),
    );
  }
}
