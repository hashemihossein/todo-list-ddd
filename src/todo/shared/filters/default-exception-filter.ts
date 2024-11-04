import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class DefaultExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(DefaultExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let httpException: HttpException | null = null;
    if (exception instanceof HttpException) {
      httpException = exception;
      while (httpException.getResponse() instanceof HttpException) {
        httpException = httpException.getResponse() as HttpException;
      }
    }

    const status =
      httpException instanceof HttpException
        ? httpException.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      httpException instanceof HttpException
        ? httpException.message
        : 'Internal server error';

    // Log detailed error for debugging
    this.logger.error(`Status ${status} Error: ${JSON.stringify(message)}`);

    response.status(status).json({
      statusCode: status,
      message:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Something went wrong'
          : message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
