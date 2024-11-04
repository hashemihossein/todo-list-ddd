import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Max, MaxLength } from 'class-validator';

export class UpdateTodoListDto {
  @ApiProperty({
    example: `updated title`,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({
    example: `updated description`,
  })
  @IsOptional()
  @IsString()
  @MaxLength(600)
  description: string;
}
