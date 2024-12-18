import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { SendLogEntity } from '../entities/send.entity'

@Injectable()
export class SendLogRepository {
	constructor(
		@InjectRepository(SendLogEntity, 'PGLogs')
		private sendLogRepository: Repository<SendLogEntity>,
	) {
		//
	}

	async store(send: SendLogEntity): Promise<void> {
		try {
			await this.sendLogRepository.save(send)
		} catch (error) {
			throw new InternalServerErrorException('Erro ao armazenar send log')
		}
	}
}
