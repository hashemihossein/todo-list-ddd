import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DefaultExceptionsFilter } from './todo/shared/filters/default-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DefaultExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Todo List DDD')
    .setDescription(
      'Domain-Driven Design, Event-Sourcing, Hexagonal Architecture example of a todo list',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3003);
}
bootstrap();
