import { Injectable } from '@nestjs/common'
import { UserCreateDto } from '@modules/v1/user/models/dto/userCreate.dto'
import { UserRepository } from '@modules/v1/user/repositories/user.repository'

@Injectable()
export class UserCreateService {
	constructor(private userRepository: UserRepository) {
		//
	}
	async execute(userCreateDto: UserCreateDto) {
		await this.userRepository.create(userCreateDto)

		return { message: 'User created' }
	}
}
