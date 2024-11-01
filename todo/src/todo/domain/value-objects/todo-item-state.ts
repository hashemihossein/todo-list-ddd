export class TodoItemState {
  constructor(public value: 'todo' | 'in-progress' | 'done') {}

  equals(value: string): boolean {
    return this.value === value;
  }

  toJSON() {
    return this.value;
  }
}
