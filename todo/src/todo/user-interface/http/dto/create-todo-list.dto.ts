import { IsString, IsUUID, Max } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  @Max(30)
  title: string;

  @IsString()
  @Max(600)
  description: string;

  @IsUUID()
  userId: string;
}
