import { Type } from '@nestjs/common';

export class EventClassRegistry {
  private static readonly nameToEventClassMap = new Map<string, Type>();

  public static add(eventClass: Type): void {
    const eventName = eventClass.name;
    this.nameToEventClassMap.set(eventName, eventClass);
  }

  public static get(eventName: string): Type {
    return this.nameToEventClassMap.get(eventName);
  }
}
