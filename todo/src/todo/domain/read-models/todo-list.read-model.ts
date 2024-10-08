export class TodoListReadModel {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly items: Array<{
      id: string;
      title: string;
      description: string;
      listId: string;
      priority: string;
      state: string;
      estimatedTime: string;
      loggedTime: string;
    }>,
    public readonly userId: string,
  ) {}
}
