import { Global, Module } from '@nestjs/common'
import { ErrorLogService } from '@modules/v1/log/services/errorLog.service'
import { ErrorLogRepository } from '@modules/v1/log/repositories/errorLog.repository'
import { RequestLogRepository } from '@modules/v1/log/repositories/requestLog.repository'
import { RequestLogService } from '@modules/v1/log/services/requestLog.service'
import { SendLogRepository } from '@modules/v1/log/repositories/sendLog.repository'
import { SendLogService } from '@modules/v1/log/services/sendLog.service'
import { dynamicImport } from '@common/utils/dynamicImport'

const services = dynamicImport({
	dir: __dirname,
	extension: 'service',
})

const repositories = dynamicImport({
	dir: __dirname,
	extension: 'repository',
})

console.log(services)
@Global()
@Module({
	imports: [],
	providers: [...services, ...repositories],
	exports: [...services],
})
export class LogModule {}
