import { Module } from '@nestjs/common';
import { TodoModule } from './todo/application/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ESDBModule } from './todo/infrastructure/persistence/esdb/esdb.module';

@Module({
  imports: [
    TodoModule,
    ESDBModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST || 'todo_mongo'}:27017/${process.env.MONGO_DB || 'todo_read_db'}`,
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'todo_postgres',
      port: 5432,
      username: process.env.POSTGRES_USER || 'youruser',
      password: process.env.POSTGRES_PASSWORD || 'yourpassword',
      database: process.env.POSTGRES_DB || 'todo_write_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
