import { Module } from '@nestjs/common';
import { TodoModule } from './todo/application/todo.module';

@Module({
  imports: [TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
