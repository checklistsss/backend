import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

@Catch()
export default class ExceptionHandlingFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    let status: number
    let message: string
    let type: string

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      message = exception.message
      type = exception.name
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      message = 'Internal server error'
      type = 'Error'
    }

    response.status(status).json({ status, type, message })
  }
}
