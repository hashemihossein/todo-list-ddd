export type SerializedEventPayload<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends { toJSON(): infer U }
        ? U
        : SerializedEventPayload<T[K]>;
    }
  : T;

export interface SerializableEvent<T = any> {
  id: string;
  type: string;
  position: BigInt;
  data: SerializedEventPayload<T>;
}
