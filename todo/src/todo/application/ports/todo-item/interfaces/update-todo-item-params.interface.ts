export interface IUpdateTodoItemParams {
  id: string;
  title?: string;
  description?: string;
  priority?: string;
  state?: string;
  estimatedTime?: number;
  loggedTime?: number;
}
