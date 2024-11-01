import { TodoItem } from '../../todo-item';
import { TodoList } from '../../todo-list';
import { AutoWired } from '../autowired-event.decorator';

@AutoWired
export class TodoItemAddedToListEvent {
  constructor(public readonly todoItemId: string) {}
}
