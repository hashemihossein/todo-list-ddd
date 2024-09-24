import { Injectable } from '@nestjs/common';
import { TodoList } from '../todo-list';
import { randomUUID } from 'crypto';

@Injectable()
export class TodoListFactory {
  create(title: string, description: string, userId: string): TodoList {
    // todo: first communicating to user-service to check the user is a valid user

    const id = randomUUID();

    return new TodoList(id, title, description, [], userId);
  }
}
