import { Injectable } from '@nestjs/common'
import { SendLogRepository } from '../repositories/sendLog.repository'
import { SendLogEntity } from '../entities/send.entity'

@Injectable()
export class SendLogService {
	constructor(private sendLogRepository: SendLogRepository) {
		//
	}

	async store(send: SendLogEntity) {
		await this.sendLogRepository.store(send)
	}
}
