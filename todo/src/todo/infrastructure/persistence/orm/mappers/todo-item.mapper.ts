import { TodoItem } from 'src/todo/domain/todo-item';
import { TodoItemEntity } from '../entities/todo-item.entity';
import { TodoItemPriority } from 'src/todo/domain/value-objects/todo-item-priority';
import { TodoItemState } from 'src/todo/domain/value-objects/todo-item-state';

export class TodoItemMapper {
  static toDomain(todoItem: TodoItemEntity): TodoItem {
    const priority = new TodoItemPriority(
      todoItem.priority as TodoItemPriority['value'],
    );
    const state = new TodoItemState(todoItem.state as TodoItemState['value']);

    return new TodoItem(
      todoItem.id,
      todoItem.title,
      todoItem.description,
      priority,
      state,
      todoItem.estimatedTime,
      todoItem.loggedTime,
    );
  }

  static toPersistence(todoItem: TodoItem): TodoItemEntity {
    const entity = new TodoItemEntity();

    entity.id = todoItem.id;
    entity.title = todoItem.title;
    entity.description = todoItem.description;
    entity.priority = todoItem.priority.value;
    entity.state = todoItem.state.value;
    entity.estimatedTime = todoItem.estimatedTime;
    entity.loggedTime = todoItem.loggedTime;

    return entity;
  }
}
