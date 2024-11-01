export class Version {
  constructor(readonly value: BigInt) {}

  toJSON() {
    return this.value.valueOf();
  }
}
