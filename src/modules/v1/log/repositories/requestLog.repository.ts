import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { RequestLogEntity } from '../entities/request.entity'
import {
	IRequestLogRepository,
	IStoreRequestLogInput,
} from '../resources/interfaces/requestLogRepository.interface'
import { AppErrorException } from '@resources/exception/appError.exception'

@Injectable()
export class RequestLogRepository implements IRequestLogRepository {
	constructor(
		@InjectRepository(RequestLogEntity, 'PGLogs')
		private requestLogRepository: Repository<RequestLogEntity>,
	) {
		//
	}

	async store(request: IStoreRequestLogInput): Promise<void> {
		try {
			await this.requestLogRepository.save(request)
		} catch (error) {
			throw new AppErrorException({
				message: 'Erro ao armazenar request log',
				errorCode: 'REPOSITORY_REQUEST_LOG_STORE',
				internalMessage: error,
			})
		}
	}
}
