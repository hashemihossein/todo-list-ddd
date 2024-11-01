import { TodoList } from '../../todo-list';
import { AutoWired } from '../autowired-event.decorator';

@AutoWired
export class TodoListCreatedEvent {
  constructor(public readonly todoList: TodoList) {}
}
