import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterDto } from '../user-interface/http/dto/register.dto';
import { LoginDto } from '../user-interface/http/dto/login.dto';

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
        // must contain register command creator
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
