import { Injectable } from '@nestjs/common'
import { ErrorLogEntity } from '../entities/error.entity'
import { ErrorLogRepository } from '../repositories/errorLog.repository'

@Injectable()
export class ErrorLogService {
	constructor(private errorLogRepository: ErrorLogRepository) {
		//
	}

	async store(error: Partial<ErrorLogEntity>) {
		await this.errorLogRepository.store(error)
	}
}
