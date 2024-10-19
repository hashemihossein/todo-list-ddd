import { MetadataType } from '@eventstore/db-client';

export type ESDBEventsType = {
  id: string;
  contentType: 'application/json';
  type: string;
  data: { id: string } & any;
  metadata: MetadataType;
};
