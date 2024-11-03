import { JSONType, MetadataType, Position } from '@eventstore/db-client';

export type RecievedEventType = {
  streamId: string;
  id: string;
  isJson: true;
  revision: bigint;
  type: string;
  created: Date;
  data: JSONType;
  metadata: MetadataType;
  position?: Position;
};
