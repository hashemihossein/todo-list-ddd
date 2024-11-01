export class TodoItemPriority {
  constructor(public value: 'low' | 'medium' | 'high') {}

  equals(value: string): boolean {
    return this.value == value;
  }

  toJSON() {
    return this.value;
  }
}
