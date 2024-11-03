export class CreateTodoListCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly userId: string,
  ) {}
}
