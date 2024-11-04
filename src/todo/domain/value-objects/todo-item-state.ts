import { BadRequestException } from '@nestjs/common';

export class TodoItemState {
  private static validStates: ['todo', 'in-progress', 'done'] = [
    'todo',
    'in-progress',
    'done',
  ];
  public readonly value: 'todo' | 'in-progress' | 'done';

  constructor(value: string) {
    if (!TodoItemState.isValidState(value)) {
      throw new BadRequestException(`Invalid state: ${value}`);
    }
    this.value = value;
  }

  static isValidState(state: any): state is 'todo' | 'in-progress' | 'done' {
    return TodoItemState.validStates.includes(state);
  }

  equals(value: string): boolean {
    return this.value === value;
  }

  toJSON() {
    return this.value;
  }
}
