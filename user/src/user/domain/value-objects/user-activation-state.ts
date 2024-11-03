export class UserActivationState {
  constructor(readonly value: 'active' | 'deactive' | 'deleted') {}

  equals(activationState: UserActivationState) {
    return this.value === activationState.value;
  }
}
