import { User } from 'src/user/domain/user';
import { UserRole } from 'src/user/domain/value-objects/user-role';

export abstract class UserRepository {
  //queries
  abstract findById(id: string): Promise<User>;
  abstract findByExactUsername(username: string): Promise<User>;
  abstract findByContainUsername(username: string): Promise<User[]>;
  abstract findByExactEmail(email: string): Promise<User>;
  abstract findByContainEmail(email: string): Promise<User[]>;
  abstract findByRole(role: UserRole): Promise<User[]>;

  //commands
  abstract save(user: User): Promise<User>;
}
