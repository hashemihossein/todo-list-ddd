import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../user-interface/http/user.controller';
import { UserFactory } from '../domain/factories/user.factory';
import { UsersInfrastructureModule } from '../infrastructure/users-infrastructure.module';

@Module({
  imports: [UsersInfrastructureModule],
  controllers: [UserController],
  providers: [UserService, UserFactory],
})
export class UserModule {}
