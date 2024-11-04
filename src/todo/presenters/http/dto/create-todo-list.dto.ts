import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Max } from 'class-validator';

export class CreateTodoListDto {
  @ApiProperty({
    required: true,
    example: `My FIRST Todo List: ${new Date()}`,
  })
  @IsString()
  @Max(30)
  title: string;

  @ApiProperty({
    required: true,
    example: `Test Description ${Math.random() * 100}`,
  })
  @IsString()
  @Max(600)
  description: string;

  @ApiProperty({
    required: true,
    example: `be0084bb-91d1-457e-bd3a-dbc25a4bbe8f`,
  })
  @IsUUID()
  userId: string;
}
