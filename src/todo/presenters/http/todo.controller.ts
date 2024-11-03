import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoListCommand } from 'src/todo/application/commands/create-todo-list.command';
import { TodoService } from '../../application/todo.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { UpdateTodoItemDto } from './dto/udpate-todo-item.dto';
import { CreateTodoItemCommand } from 'src/todo/application/commands/create-todo-item.command';
import { UpdateTodoListCommand } from 'src/todo/application/commands/udpate-todo-list.command';
import { UpdateTodoItemCommand } from 'src/todo/application/commands/udpate-todo-item.command';
import { DeleteTodoListCommand } from 'src/todo/application/commands/delete-todo-list.command';
import { DeleteTodoItemCommand } from 'src/todo/application/commands/delete-todo-item.command';
import { GetTodoListQuery } from 'src/todo/application/queries/get-todo-list.query';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('list')
  createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
    return this.todoService.createTodoList(
      new CreateTodoListCommand(
        createTodoListDto.title,
        createTodoListDto.description,
        createTodoListDto.userId,
      ),
    );
  }

  @Post('item')
  createTodoItem(@Body() createTodoItemDto: CreateTodoItemDto) {
    return this.todoService.createTodoItem(
      new CreateTodoItemCommand(
        createTodoItemDto.title,
        createTodoItemDto.description,
        createTodoItemDto.listId,
        createTodoItemDto.priority,
        createTodoItemDto.state,
        createTodoItemDto.estimatedTime,
      ),
    );
  }

  @Get('list/:id')
  getTodoList(@Param('id') id: string) {
    return this.todoService.getTodoList(new GetTodoListQuery(id));
  }

  @Delete('list/:id')
  deleteTodoList(@Param('id') id: string) {
    return this.todoService.deleteTodoList(new DeleteTodoListCommand(id));
  }

  @Delete('item/:id')
  deleteTodoItem(@Param('id') id: string) {
    return this.todoService.deleteTodoItem(new DeleteTodoItemCommand(id));
  }

  @Patch('list/:id')
  updateTodoList(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    return this.todoService.updateTodoList(
      new UpdateTodoListCommand(
        id,
        updateTodoListDto.title,
        updateTodoListDto.description,
      ),
    );
  }

  @Patch('item/:id')
  updateTodoItem(
    @Param('id') id: string,
    @Body() updateTodoItemDto: UpdateTodoItemDto,
  ) {
    return this.todoService.updateTodoItem(
      new UpdateTodoItemCommand(
        id,
        updateTodoItemDto.title,
        updateTodoItemDto.description,
        updateTodoItemDto.priority,
        updateTodoItemDto.state,
        updateTodoItemDto.estimatedTime,
        updateTodoItemDto.loggedTime,
      ),
    );
  }
}
