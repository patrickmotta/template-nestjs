import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { SendLogEntity } from '@modules/v1/log/models/entities/send.entity'
import {
	ISendLogRepository,
	IStoreSendLogInput,
} from '@modules/v1/log/resources/interfaces/repositories/sendLogRepository.interface'
import { AppErrorException } from '@common/exception/appError.exception'

@Injectable()
export class SendLogRepository implements ISendLogRepository {
	constructor(
		@InjectRepository(SendLogEntity, 'PGLogs')
		private sendLogRepository: Repository<SendLogEntity>,
	) {
		//
	}

	async store(send: IStoreSendLogInput): Promise<void> {
		try {
			await this.sendLogRepository.save(send)
		} catch (error) {
			throw new AppErrorException({
				message: 'Erro ao armazenar send log',
				errorCode: 'REPOSITORY_SEND_LOG_STORE',
				internalMessage: error,
			})
		}
	}
}
