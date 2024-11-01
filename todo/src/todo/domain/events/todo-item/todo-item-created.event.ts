import { TodoItem } from '../../todo-item';
import { AutoWired } from '../autowired-event.decorator';

@AutoWired
export class TodoItemCreatedEvent {
  constructor(public readonly todoItem: TodoItem) {}
}
