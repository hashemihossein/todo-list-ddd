export class TodoItemPriority {
  constructor(public value: 'low' | 'medium' | 'high') {}

  equals(value: string): boolean {
    return this.value == value;
  }
}
