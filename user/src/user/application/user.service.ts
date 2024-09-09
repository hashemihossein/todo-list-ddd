import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands/create-user.command';
import { UserFactory } from '../domain/factories/user.factory';
import { UserRepository } from './ports/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly userRepository: UserRepository,
  ) {}

  create(createUserCommand: CreateUserCommand) {
    const user = this.userFactory.create(
      createUserCommand.firstname,
      createUserCommand.lastname,
      createUserCommand.username,
      createUserCommand.email,
      createUserCommand.role,
      createUserCommand.activationState,
    );

    return this.userRepository.save(user);
  }

  getProfile() {}
}
