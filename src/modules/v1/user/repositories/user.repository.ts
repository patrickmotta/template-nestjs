import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { UserCreateDto } from '@modules/v1/user/models/dto/userCreate.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '@modules/v1/user/models/entities/user.entity'
import { Repository } from 'typeorm'

interface IFindOneInput {
	id?: number
	document?: string
}

@Injectable()
export class UserRepository {
	constructor(
		@InjectRepository(UserEntity, 'PGService')
		private readonly userRepository: Repository<UserEntity>,
	) {}
	async create(userCreateDto: UserCreateDto) {
		try {
			await this.userRepository.save(userCreateDto)
		} catch (error) {
			console.log(error)
			if (error.code === '23505') {
				const message = error?.detail
					.replaceAll('(', '')
					.replaceAll(')', ' ')
					.replaceAll('=', '')
					.replaceAll('Key', '')
				throw new ConflictException(message)
			}
		}
	}
	async findAll() {
		return await this.userRepository.find()
	}
	async findOne({ id, document }: IFindOneInput) {
		const DBUser = await this.userRepository.findOne({
			where: {
				id,
				document,
			},
		})

		if (!DBUser) {
			throw new NotFoundException('Cliente não encontrado')
		}

		return DBUser
	}
}
