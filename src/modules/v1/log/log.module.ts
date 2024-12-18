import { Global, Module } from '@nestjs/common'
import { ErrorLogService } from './services/errorLog.service'
import { ErrorLogRepository } from './repositories/errorLog.repository'
import { RequestLogRepository } from './repositories/requestLog.repository'
import { RequestLogService } from './services/requestLog.service'
import { SendLogRepository } from './repositories/sendLog.repository'
import { SendLogService } from './services/sendLog.service'

@Global()
@Module({
	imports: [],
	providers: [
		ErrorLogService,
		RequestLogService,
		SendLogRepository,
		ErrorLogRepository,
		RequestLogRepository,
		SendLogService,
	],
	exports: [ErrorLogService, RequestLogService, SendLogService],
})
export class LogModule {}
