import { Injectable } from '@nestjs/common'
import { UserRepository } from '@modules/v1/user/repositories/user.repository'
import { UserEntity } from '../models/entities/user.entity'

@Injectable()
export class UserGetAllService {
	constructor(private userRepository: UserRepository) {
		//
	}
	async execute(): Promise<UserEntity[]> {
		return await this.userRepository.findAll()
	}
}
