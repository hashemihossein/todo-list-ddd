import { IsEnum, IsNumber, IsString, Max } from 'class-validator';

enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

enum State {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export class CreateTodoItemDto {
  @IsString()
  @Max(30)
  title: string;

  @IsString()
  @Max(600)
  description: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsEnum(State)
  state: State;

  @IsNumber()
  estimatedTime: number;
}
