import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  MaxLength,
} from 'class-validator';

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
  @ApiProperty({
    required: true,
    example: `My FIRST Todo Item: ${new Date()}`,
  })
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    example: `Test Description ${Math.random() * 100}`,
  })
  @IsString()
  @MaxLength(600)
  description: string;

  @ApiProperty({
    required: true,
    example: `d7a229e1-6d79-4ebb-ad21-aa6bf3f4983f`,
  })
  @IsString()
  listId: string;

  @ApiProperty({
    required: true,
    type: String,
    enum: Priority,
    example: `low`,
  })
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty({
    required: true,
    type: String,
    enum: State,
    example: `todo`,
  })
  @IsEnum(State)
  state: State;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'in minutes',
    example: 123,
  })
  @IsNumber()
  estimatedTime: number;
}
