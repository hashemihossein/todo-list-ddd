import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoItemDto } from './create-todo-item.dto';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateTodoItemDto extends PartialType(CreateTodoItemDto) {
  @IsOptional()
  @IsNumber()
  @Min(1)
  loggedTime: number;
}
