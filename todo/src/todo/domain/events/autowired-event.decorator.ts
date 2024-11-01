import { EventClassRegistry } from './event-class.registry';

export const AutoWired: ClassDecorator = (target: any) => {
  EventClassRegistry.add(target);
};
