import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user.repository'

interface IInput {
	id?: number
	document?: string
}

@Injectable()
export class UserGetService {
	constructor(private userRepository: UserRepository) {
		//
	}
	async execute({ id, document }: IInput) {
		if (id || document) {
			return await this.userRepository.findOne({ document, id })
		}
		return await this.userRepository.findAll()
	}
}
