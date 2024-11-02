import { TodoItem } from "../../todo-item";
import { AutoWired } from "../autowired-event.decorator";

@AutoWired
export class TodoItemUpdatedEvent {
    constructor(public readonly todoItem: TodoItem){}
}