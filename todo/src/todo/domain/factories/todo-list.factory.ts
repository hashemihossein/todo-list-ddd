import { Injectable } from '@nestjs/common';
import { TodoList } from '../todo-list';
import { randomUUID } from 'crypto';
import { TodoListCreatedEvent } from '../events/todo-list/todo-list-created.event';

@Injectable()
export class TodoListFactory {
  create(title: string, description: string, userId: string): TodoList {
    // todo: first communicating to user-service to check the user is a valid user

    const id = randomUUID();

    const todoList = new TodoList(id, title, description, [], userId);
    todoList.apply(new TodoListCreatedEvent(todoList));
    return todoList;
  }
}
