export class TodoListReadModel {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public items: Array<{
      id: string;
      title: string;
      description: string;
      listId: string;
      priority: string;
      state: string;
      estimatedTime: number;
      loggedTime: number;
    }>,
    public userId: string,
  ) {}
}
