import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoListDto } from './create-todo-list.dto';
import { IsOptional, IsString, Max } from 'class-validator';

export class UpdateTodoListDto extends PartialType(CreateTodoListDto) {
  @IsOptional()
  @IsString()
  @Max(30)
  title: string;

  @IsOptional()
  @IsString()
  @Max(600)
  description: string;
}
