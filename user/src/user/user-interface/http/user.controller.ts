import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/user/application/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserCommand } from 'src/user/application/commands/create-user.command';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(
      new CreateUserCommand(
        createUserDto.firstname,
        createUserDto.lastname,
        createUserDto.username,
        createUserDto.email,
        createUserDto.role,
        createUserDto.activationState,
      ),
    );
  }

  @Get(':id')
  getProfile() {
    return this.userService.getProfile();
  }
}
