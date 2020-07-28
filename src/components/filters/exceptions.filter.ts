import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const exceptionReason = exception.response;
    exception.initMessage();
    const responseMessage = {
      status:
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      error:
        exception.message !== exceptionReason.message
          ? exception.message
          : undefined,
      message: exceptionReason
        ? exceptionReason.message
        : 'Something went wrong!',
      reason: exception.message.reason ? exception.message.reason : undefined,
      request: {
        path: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
      },
    };

    response.status(responseMessage.status).json(responseMessage);
  }
}
