import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../../app.service';
import { CreateUserDto } from '../../create-user.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.appService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.appService.register(registerDto);
  }
}
