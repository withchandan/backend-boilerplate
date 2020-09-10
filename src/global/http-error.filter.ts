import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

export interface ExceptionResponse {
  error: string
  message: string
  statusCode: HttpStatus
}

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
    let message = exception.message || 'Internal server error'

    const exceptionResponse = exception.getResponse()

    Logger.log({ exceptionResponse })

    if (typeof exceptionResponse === 'object') {
      message = (exceptionResponse as ExceptionResponse).error
    } else {
      message = exceptionResponse
    }

    const errorResponse = {
      code: status,
      path: request.url,
      message,
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        'ExceptionFilter',
      )
    } else {
      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(errorResponse),
        'ExceptionFilter',
      )
    }

    response.status(status).json(errorResponse)
  }
}
