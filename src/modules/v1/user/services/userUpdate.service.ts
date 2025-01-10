import { Injectable } from '@nestjs/common'
import { UserCreateDto } from '../models/dto/userCreate.dto'
import { UserRepository } from '../repositories/user.repository'
import { UserGetOneService } from './userGetOne.service'

interface IUserUpdateServiceInput {
	id: number
	userUpdate: Partial<UserCreateDto>
}

@Injectable()
export class UserUpdateService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userGetOneService: UserGetOneService,
	) {
		//
	}

	async execute({ id, userUpdate }: IUserUpdateServiceInput): Promise<object> {
		const user = await this.userGetOneService.execute({ id })

		Object.assign(user, userUpdate)

		await this.userRepository.update(user)

		return { message: 'Usuario atualizado' }
	}
}
