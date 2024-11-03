import { AutoWired } from '../autowired-event.decorator';

@AutoWired
export class ItemDeletedFromListEvent {
  constructor(public readonly payload: { id: string }) {}
}
