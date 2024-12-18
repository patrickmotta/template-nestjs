import { Injectable } from '@nestjs/common'
import { RequestLogRepository } from '../repositories/requestLog.repository'
import { RequestLogEntity } from '../entities/request.entity'

@Injectable()
export class RequestLogService {
	constructor(private requestLogRepository: RequestLogRepository) {
		//
	}

	async store(request: RequestLogEntity): Promise<void> {
		await this.requestLogRepository.store(request)
	}
}
