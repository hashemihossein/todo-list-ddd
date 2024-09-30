import { Module } from '@nestjs/common';
import { TodoModule } from './todo/application/todo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot('mongodb://localhost:27019/read_todo_list'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
