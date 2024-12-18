import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { RequestLogEntity } from '../entities/request.entity'

@Injectable()
export class RequestLogRepository {
	constructor(
		@InjectRepository(RequestLogEntity, 'PGLogs')
		private requestLogRepository: Repository<RequestLogEntity>,
	) {
		//
	}

	async store(request: RequestLogEntity): Promise<void> {
		try {
			await this.requestLogRepository.save(request)
		} catch (error) {
			throw new InternalServerErrorException('Erro ao armazenar request log')
		}
	}
}
