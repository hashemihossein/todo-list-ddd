export class TodoItemPriority {
  private static validStates: ['low' , 'medium' , 'high'] = ['low' , 'medium' , 'high'];
  public readonly value: 'low' | 'medium' | 'high';

  constructor( value: string) {
    if ( !TodoItemPriority.isValidState(value) ) {
      throw new Error(`Invalid state: ${value}`)
    }
    this.value = value
  }

  static isValidState(state: any): state is 'low' | 'medium' | 'high' {
    return this.validStates.includes(state);
  }

  equals(value: string): boolean {
    return this.value === value;
  }

  toJSON() {
    return this.value;
  }
}
