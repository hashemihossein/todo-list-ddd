import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../../app.service';
import { CreateUserDto } from '../../create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.appService.signup(createUserDto);
  }
}
