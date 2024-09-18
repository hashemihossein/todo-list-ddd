import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TodoItemPriority } from '../value-objects/todo-item-priority';
import { TodoItemState } from '../value-objects/todo-item-state';
import { TodoItem } from '../todo-item';
import { TodoList } from '../todo-list';

@Injectable()
export class TodoItemFactory {
  constructor(
    title: string,
    description: string,
    priority: string,
    estimatedTime: number,
  ) {
    const id = randomUUID();
    const todoItemPriority = new TodoItemPriority(
      priority as TodoItemPriority['value'],
    );
    const todoItemState = new TodoItemState('todo');

    return new TodoItem(
      id,
      title,
      description,
      todoItemPriority,
      todoItemState,
      estimatedTime,
      0,
    );
  }
}
