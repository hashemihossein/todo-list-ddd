import { Body, Controller, Post } from '@nestjs/common';
import { TodoService } from '../../application/todo.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { CreateTodoListCommand } from 'src/todo/application/commands/create-todo-list.command';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('list')
  createTodo(@Body() createTodoListDto: CreateTodoListDto) {
    return this.todoService.createTodoList(
      new CreateTodoListCommand(
        createTodoListDto.title,
        createTodoListDto.description,
        createTodoListDto.userId,
      ),
    );
  }
}
