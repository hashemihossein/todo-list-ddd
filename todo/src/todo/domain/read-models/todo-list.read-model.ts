export class TodoListReadModel {
  id: string;
  title: string;
  description: string;
  items: [
    {
      id: string;
      title: string;
      description: string;
      listId: string;
      priority: string;
      state: string;
      estimatedTime: string;
      loggedTime: string;
    },
  ];
  userId: string;
}
