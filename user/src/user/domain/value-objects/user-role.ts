export class UserRole {
  constructor(readonly value: 'admin' | 'accounter' | 'user' | 'guest') {}

  equals(role: UserRole) {
    return this.value === role.value;
  }
}
