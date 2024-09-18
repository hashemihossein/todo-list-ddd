import { TodoList } from 'src/todo/domain/todo-list';
import { TodoListEntity } from '../entities/todo-list.entity';
import { TodoItemMapper } from './todo-item.mapper';

export class TodoListMapper {
  static toDomain(todoList: TodoListEntity): TodoList {
    const items = todoList.items.map((item) => TodoItemMapper.toDomain(item));
    return new TodoList(
      todoList.id,
      todoList.title,
      todoList.description,
      items,
      todoList.userId,
    );
  }

  static toPersistence(todoList: TodoList): TodoListEntity {
    const entity = new TodoListEntity();
    const itemsEntity = todoList.items.map((item) =>
      TodoItemMapper.toPersistence(item),
    );

    entity.id = todoList.id;
    entity.title = todoList.title;
    entity.description = todoList.description;
    entity.items = itemsEntity;
    entity.userId = todoList.userId;

    return entity;
  }
}
