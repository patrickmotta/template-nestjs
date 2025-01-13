import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '@modules/v1/user/models/entities/user.entity'
import { Repository } from 'typeorm'
import {
	ICreateInput,
	ICreateOutput,
	IFindAllOutput,
	IFindByDocumentInput,
	IFindByDocumentOutput,
	IFindByEmailInput,
	IFindByEmailOutput,
	IFindByIdInput,
	IFindByIdOutput,
	IUpdateInput,
	IUserRepository,
} from '@modules/v1/user/resources/interfaces/repositories/userRepository.interface'
import { AppErrorException } from '@common/exception/appError.exception'
import { AppHttpErrorException } from '@common/exception/appHttpError.exception'

@Injectable()
export class UserRepository implements IUserRepository {
	constructor(
		@InjectRepository(UserEntity, 'PGService')
		private readonly userRepository: Repository<UserEntity>,
	) {}
	async create(user: ICreateInput): Promise<ICreateOutput> {
		try {
			await this.userRepository.save(user)
		} catch (error) {
			const dbError = error as { message: string }
			throw new AppErrorException({
				message: 'Erro ao criar usuário',
				errorCode: 'ERROR_PG_CREATE_USER',
				internalMessage: dbError.message,
			})
		}
	}
	async findAll(): Promise<IFindAllOutput[]> {
		try {
			return await this.userRepository.find()
		} catch (error) {
			const dbError = error as { message: string }

			throw new AppErrorException({
				message: 'Erro ao buscar usuários',
				errorCode: 'ERROR_PG_GET_USERS',
				internalMessage: dbError.message,
			})
		}
	}
	async findByDocument({
		document,
	}: IFindByDocumentInput): Promise<IFindByDocumentOutput> {
		try {
			const DBUser = await this.userRepository.findOne({
				where: {
					document,
				},
			})

			if (!DBUser) {
				throw new AppHttpErrorException({
					message: 'Usuário não encontrado',
					errorCode: 'NOT_FOUND_USER',
					statusCode: HttpStatus.FORBIDDEN,
				})
			}

			return DBUser
		} catch (error) {
			if (error instanceof AppHttpErrorException)
				throw new AppHttpErrorException({
					message: error.message,
					errorCode: error.errorCode,
					statusCode: HttpStatus.FORBIDDEN,
				})

			const dbError = error as { message: string }

			throw new AppErrorException({
				message: 'Erro ao buscar usuário',
				errorCode: 'ERROR_PG_GET_USERS',
				internalMessage: dbError.message,
			})
		}
	}

	async findByEmail({ email }: IFindByEmailInput): Promise<IFindByEmailOutput> {
		try {
			const DBUser = await this.userRepository.findOne({
				where: {
					email,
				},
			})

			if (!DBUser) {
				throw new AppHttpErrorException({
					message: 'Usuário não encontrado',
					errorCode: 'NOT_FOUND_USER_BY_EMAIL',
					statusCode: HttpStatus.FORBIDDEN,
				})
			}

			return DBUser
		} catch (error) {
			if (error instanceof AppHttpErrorException)
				throw new AppHttpErrorException({
					message: error.message,
					errorCode: error.errorCode,
					statusCode: HttpStatus.FORBIDDEN,
				})

			const dbError = error as { message: string }

			throw new AppErrorException({
				message: 'Erro ao buscar usuário',
				errorCode: 'ERROR_PG_GET_USERS_BY_EMAIL',
				internalMessage: dbError.message,
			})
		}
	}
	async findById({ id }: IFindByIdInput): Promise<IFindByIdOutput> {
		try {
			const DBUser = await this.userRepository.findOne({
				where: {
					id,
				},
			})

			if (!DBUser) {
				throw new AppHttpErrorException({
					message: 'Usuário não encontrado',
					errorCode: 'NOT_FOUND_USER_BY_ID',
					statusCode: HttpStatus.FORBIDDEN,
				})
			}

			return DBUser
		} catch (error) {
			if (error instanceof AppHttpErrorException)
				throw new AppHttpErrorException({
					message: error.message,
					errorCode: error.errorCode,
					statusCode: HttpStatus.FORBIDDEN,
				})

			const dbError = error as { message: string }

			throw new AppErrorException({
				message: 'Erro ao buscar usuário',
				errorCode: 'ERROR_PG_GET_USERS_BY_ID',
				internalMessage: dbError.message,
			})
		}
	}

	async update(user: IUpdateInput): Promise<void> {
		try {
			await this.userRepository.save(user)
		} catch (error) {
			const dbError = error as { message: string }

			throw new AppErrorException({
				message: 'Erro ao atualizar usuário',
				errorCode: 'ERROR_PG_UPDATE_USER',
				internalMessage: dbError.message,
			})
		}
	}
}
