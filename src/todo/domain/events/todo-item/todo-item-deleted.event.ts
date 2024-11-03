import { AutoWired } from '../autowired-event.decorator';

@AutoWired
export class TodoItemDeletedEvent {
  constructor(public readonly payload: { id: string; listId: string }) {}
}
