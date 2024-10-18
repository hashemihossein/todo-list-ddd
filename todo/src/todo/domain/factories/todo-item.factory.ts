import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TodoItemPriority } from '../value-objects/todo-item-priority';
import { TodoItemState } from '../value-objects/todo-item-state';
import { TodoItem } from '../todo-item';
import { TodoItemCreatedEvent } from '../events/todo-item/todo-item-created.event';

@Injectable()
export class TodoItemFactory {
  create(
    title: string,
    description: string,
    listId: string,
    priority: string,
    estimatedTime: number,
  ): TodoItem {
    const id = randomUUID();
    const todoItemPriority = new TodoItemPriority(
      priority as TodoItemPriority['value'],
    );
    const todoItemState = new TodoItemState('todo');

    const todoItem = new TodoItem(
      id,
      title,
      description,
      listId,
      todoItemPriority,
      todoItemState,
      estimatedTime,
      0,
    );

    todoItem.apply(new TodoItemCreatedEvent(todoItem));

    return todoItem;
  }
}
