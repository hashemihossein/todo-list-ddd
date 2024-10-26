import { Module } from '@nestjs/common';
import { TodoModule } from './todo/application/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './todo/infrastructure/persistence/persistence.module';

@Module({
  imports: [
    TodoModule,
    PersistenceModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST || 'localhost'}:27017/${process.env.MONGO_DB || 'todo_read_db'}`,
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || '0.0.0.0',
      port: 5434,
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
