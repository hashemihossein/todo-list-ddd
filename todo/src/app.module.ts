import { Module } from '@nestjs/common';
import { TodoModule } from './todo/application/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
