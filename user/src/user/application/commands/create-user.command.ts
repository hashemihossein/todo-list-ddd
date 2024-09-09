export class CreateUserCommand {
  constructor(
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly username: string,
    public readonly email: string,
    public readonly role: string,
    public readonly activationState: string,
  ) {}
}
