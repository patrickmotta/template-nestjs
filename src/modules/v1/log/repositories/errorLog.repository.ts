import { InjectRepository } from '@nestjs/typeorm'
import { ErrorLogEntity } from '@modules/v1/log/models/entities/error.entity'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import {
	IErrorLogRepository,
	IStoreErrorLogInput,
} from '@modules/v1/log/resources/interfaces/errorLogRepository.interface'
import { AppErrorException } from '@common/exception/appError.exception'

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
