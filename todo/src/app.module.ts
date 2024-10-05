import { Module } from '@nestjs/common';
import { TodoModule } from './todo/application/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListEntity } from './todo/infrastructure/persistence/orm/entities/todo-list.entity';
import { TodoItemEntity } from './todo/infrastructure/persistence/orm/entities/todo-item.entity';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot('mongodb://localhost:27019/'),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'youruser',
      password: 'yourpassword',
      database: 'todo_write_db',
      entities: [TodoListEntity, TodoItemEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
