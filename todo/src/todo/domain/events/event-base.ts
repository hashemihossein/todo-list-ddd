export class EventBase {
  id: string;
  type: string;
  data: { id: string } & Record<string, any>;
  metadata: Record<string, any>;
}
