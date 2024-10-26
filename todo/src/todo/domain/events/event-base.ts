import { IEvent } from '@nestjs/cqrs';

export class EventBase implements IEvent {
  id: string;
  type: string;
  data: { id: string } & Record<string, any>;
  metadata: Record<string, any>;
}
