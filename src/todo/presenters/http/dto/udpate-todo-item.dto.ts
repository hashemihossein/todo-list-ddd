import { CreateTodoItemDto } from './create-todo-item.dto';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateTodoItemDto extends PartialType(CreateTodoItemDto) {
  @ApiProperty({
    required: true,
    example: `My FIRST Todo List: ${new Date()}`,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  loggedTime?: number;
}
