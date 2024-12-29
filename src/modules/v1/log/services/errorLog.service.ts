import { Injectable } from '@nestjs/common'
import { ErrorLogEntity } from '@modules/v1/log/models/entities/error.entity'
import { ErrorLogRepository } from '@modules/v1/log/repositories/errorLog.repository'

@Injectable()
export class ErrorLogService {
	constructor(private errorLogRepository: ErrorLogRepository) {
		//
	}

	async store(error: Partial<ErrorLogEntity>) {
		await this.errorLogRepository.store(error)
	}
}
