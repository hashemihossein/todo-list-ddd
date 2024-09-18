import { Injectable } from '@nestjs/common';
import { TodoList } from '../todo-list';
import { randomUUID } from 'crypto';

@Injectable()
export class TodoListFactory {
  create(title: string, description: string, userId: string) {
    // todo: first communicating to user-service to check the user is a valid user

    const id = randomUUID();

    const newTodoList = new TodoList(id, title, description, [], userId);
  }
}
