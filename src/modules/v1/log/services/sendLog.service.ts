import { Injectable } from '@nestjs/common'
import { SendLogRepository } from '@modules/v1/log/repositories/sendLog.repository'
import { SendLogEntity } from '@modules/v1/log/models/entities/send.entity'

@Injectable()
export class SendLogService {
	constructor(private sendLogRepository: SendLogRepository) {
		//
	}

	async store(send: SendLogEntity) {
		await this.sendLogRepository.store(send)
	}
}
