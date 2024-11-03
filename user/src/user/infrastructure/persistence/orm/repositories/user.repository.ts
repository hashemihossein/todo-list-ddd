import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/application/ports/user.repository';
import { UserEntity } from '../entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { User } from 'src/user/domain/user';
import { UserRole } from 'src/user/domain/value-objects/user-role';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class OrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //queries
  async findById(id: string): Promise<User> {
    const users = await this.userRepository.find({
      where: {
        id,
      },
    });
    if (users.length == 0) {
      return null;
    }
    return UserMapper.toDomain(users[0]);
  }

  async findByExactEmail(email: string): Promise<User> {
    const users = await this.userRepository.find({
      where: {
        email,
      },
    });
    if (users.length == 0) {
      return null;
    }
    return UserMapper.toDomain(users[0]);
  }

  async findByContainEmail(email: string): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        email,
      },
    });
    return users.map((user) => UserMapper.toDomain(user));
  }

  async findByExactUsername(username: string): Promise<User> {
    const users = await this.userRepository.find({
      where: {
        username,
      },
    });
    if (users.length == 0) {
      return null;
    }
    return UserMapper.toDomain(users[0]);
  }

  async findByContainUsername(username: string): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        username,
      },
    });
    return users.map((user) => UserMapper.toDomain(user));
  }

  async findByRole(role: UserRole): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        role: role.value,
      },
    });
    return users.map((user) => UserMapper.toDomain(user));
  }

  //commands
  async save(user: User): Promise<User> {
    return UserMapper.toDomain(
      await this.userRepository.save(UserMapper.toPersistence(user)),
    );
  }
}
