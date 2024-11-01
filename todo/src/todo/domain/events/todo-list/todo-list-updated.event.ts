import { TodoList } from '../../todo-list';
import { AutoWired } from '../autowired-event.decorator';

@AutoWired
export class TodoListUpdatedEvent {
  constructor(
    public readonly payload: {
      id: string;
      title: string;
      description: string;
    },
  ) {}
}
