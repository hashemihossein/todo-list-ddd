import { UserActivationState } from './value-objects/user-activation-state';
import { UserRole } from './value-objects/user-role';

export class User {
  constructor(
    public id: string,
    public firstname: string,
    public lastname: string,
    public username: string,
    public email: string,
    public role: UserRole,
    public activationState: UserActivationState,
  ) {}
}
