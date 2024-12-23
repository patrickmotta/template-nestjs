import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { SendLogEntity } from '../entities/send.entity'
import {
	ISendLogRepository,
	IStoreSendLogInput,
} from '../resources/interfaces/sendLogRepository.interface'
import { AppErrorException } from '@resources/exception/appError.exception'

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
