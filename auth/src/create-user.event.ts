export class CreateUserEvent {
  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  toString() {
    return JSON.stringify({
      username: this.username,
      email: this.email,
      password: this.password,
    });
  }
}
