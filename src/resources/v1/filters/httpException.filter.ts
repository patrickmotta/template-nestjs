// import { LogService } from '@app/modules/log/log.service'
import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { ErrorLogService } from 'src/modules/v1/log/services/errorLog.service'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	constructor(
		private dapterHost: HttpAdapterHost,
		private errorLogService: ErrorLogService,
	) {}

	catch(exception: unknown, host: ArgumentsHost) {
		const { httpAdapter } = this.dapterHost
		const context = host.switchToHttp()
		const request = context.getRequest()
		const response = context.getResponse()
		const { status, body } =
			exception instanceof HttpException
				? {
						status: exception.getStatus(),
						body: exception.getResponse(),
					}
				: {
						status: HttpStatus.INTERNAL_SERVER_ERROR,
						body: {
							statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
							timestamp: new Date().toISOString(),
							path: httpAdapter.getRequestUrl(request),
						},
					}
		const { error } =
			exception instanceof HttpException
				? {
						error: exception.message,
					}
				: {
						error: exception as Error,
					}

		this.errorLogService.store({
			request: {
				body: request.body,
				params: request.params,
				query: request.query,
			},
			error,
			method: request.method,
			path: httpAdapter.getRequestUrl(request),
		})

		httpAdapter.reply(response, body, status)
	}
}
