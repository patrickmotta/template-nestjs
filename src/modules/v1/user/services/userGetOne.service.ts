import { Injectable } from '@nestjs/common'
import { UserRepository } from '@modules/v1/user/repositories/user.repository'
import { UserEntity } from '../models/entities/user.entity'

interface IInput {
	id?: number
	document?: string
	email?: string
}

@Injectable()
export class UserGetOneService {
	constructor(private readonly userRepository: UserRepository) {
		//
	}
	async execute({ id, document, email }: IInput): Promise<UserEntity> {
		if (email) return await this.userRepository.findByEmail({ email })
		if (id) return await this.userRepository.findById({ id })
		if (document) return await this.userRepository.findByDocument({ document })
		throw new Error('Metodo não implementado')
	}
}
