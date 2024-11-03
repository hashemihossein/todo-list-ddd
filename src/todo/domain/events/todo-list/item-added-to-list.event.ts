import { AutoWired } from '../autowired-event.decorator';

@AutoWired
export class ItemAddedToListEvent {
  constructor(public readonly payload: { id: string }) {}
}
