export class CreateTodoItemCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly listId: string,
    public readonly priority: string,
    public readonly state: string,
    public readonly estimatedTime: number,
  ) {}
}
