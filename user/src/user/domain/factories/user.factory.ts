import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserRole } from '../value-objects/user-role';
import { UserActivationState } from '../value-objects/user-activation-state';
import { User } from '../user';

@Injectable()
export class UserFactory {
  create(
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    role: string,
    activationState: string,
  ) {
    const userId = randomUUID();
    const userRole = new UserRole(role as UserRole['value']);
    const userActivationState = new UserActivationState(
      activationState as UserActivationState['value'],
    );

    // maybe we should validate inputs here. and maybe not!

    return new User(
      userId,
      firstname,
      lastname,
      username,
      email,
      userRole,
      userActivationState,
    );
  }
}
