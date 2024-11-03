import { User } from 'src/user/domain/user';
import { UserEntity } from '../entities/user.entity';
import { UserRole } from 'src/user/domain/value-objects/user-role';
import { UserActivationState } from 'src/user/domain/value-objects/user-activation-state';

export class UserMapper {
  static toDomain(userEntity: UserEntity): User {
    const userRole = new UserRole(userEntity.role as UserRole['value']);
    const userActivationState = new UserActivationState(
      userEntity.activationState as UserActivationState['value'],
    );
    return new User(
      userEntity.id,
      userEntity.firstname,
      userEntity.lastname,
      userEntity.username,
      userEntity.email,
      userRole,
      userActivationState,
    );
  }

  static toPersistence(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.firstname = user.firstname;
    entity.lastname = user.lastname;
    entity.username = user.username;
    entity.email = user.email;
    entity.role = user.role.value;
    entity.activationState = user.activationState.value;
    return entity;
  }
}
