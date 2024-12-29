import { Injectable } from '@nestjs/common'
import { RequestLogRepository } from '@modules/v1/log/repositories/requestLog.repository'
import { RequestLogEntity } from '@modules/v1/log/models/entities/request.entity'

@Injectable()
export class RequestLogService {
	constructor(private requestLogRepository: RequestLogRepository) {
		//
	}

	async store(request: RequestLogEntity): Promise<void> {
		await this.requestLogRepository.store(request)
	}
}
