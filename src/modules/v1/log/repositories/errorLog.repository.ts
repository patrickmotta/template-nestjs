import { InjectRepository } from '@nestjs/typeorm'
import { ErrorLogEntity } from '../entities/error.entity'
import { Repository } from 'typeorm'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

@Injectable()
export class ErrorLogRepository {
	constructor(
		@InjectRepository(ErrorLogEntity, 'PGLogs')
		private errorLogRepository: Repository<ErrorLogEntity>,
	) {
		//
	}

	async store(error: Partial<ErrorLogEntity>): Promise<void> {
		try {
			await this.errorLogRepository.save(error)
		} catch (error) {
			throw new InternalServerErrorException('Erro ao salvar log de erro :V')
		}
	}
}
