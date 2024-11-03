import { AutoWired } from "../autowired-event.decorator";

@AutoWired
export class TodoListDeletedEvent {
    constructor(public readonly payload: {id : string}){}
}