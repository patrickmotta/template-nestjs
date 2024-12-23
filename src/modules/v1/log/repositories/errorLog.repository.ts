import { InjectRepository } from '@nestjs/typeorm'
import { ErrorLogEntity } from '../entities/error.entity'
import { Repository } from 'typeorm'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import {
	IErrorLogRepository,
	IStoreErrorLogInput,
} from '../resources/interfaces/errorLogRepository.interface'
import { AppErrorException } from '@resources/exception/appError.exception'

@Injectable()
export class ErrorLogRepository implements IErrorLogRepository {
	constructor(
		@InjectRepository(ErrorLogEntity, 'PGLogs')
		private errorLogRepository: Repository<ErrorLogEntity>,
	) {
		//
	}

	async store(error: IStoreErrorLogInput): Promise<void> {
		try {
			await this.errorLogRepository.save(error)
		} catch (error) {
			throw new AppErrorException({
				message: 'Erro ao salvar log de erro',
				errorCode: 'REPOSITORY_ERROR_LOG_STORE',
				internalMessage: error,
			})
		}
	}
}
