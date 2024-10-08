import { Injectable } from '@nestjs/common';
import { TodoListReadModel } from '../read-models/todo-list.read-model';
import { TodoList } from '../todo-list';

@Injectable()
export class TodoListReadModelFactory {
  public create(todoList: TodoList): TodoListReadModel {
    const readModelItems = todoList.items.map((todoItem) => {
      return {
        id: todoItem.id,
        title: todoItem.title,
        description: todoItem.description,
        listId: todoItem.listId,
        priority: todoItem.priority.value,
        state: todoItem.state.value,
        estimatedTime: String(todoItem.estimatedTime),
        loggedTime: String(todoItem.loggedTime),
      };
    });
    return new TodoListReadModel(
      todoList.id,
      todoList.title,
      todoList.description,
      readModelItems,
      todoList.userId,
    );
  }
}
