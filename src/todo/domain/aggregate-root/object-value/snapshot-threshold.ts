export class SnapshotThreshold {
  constructor(readonly value: number) {}

  toJSON() {
    return this.value;
  }
}
