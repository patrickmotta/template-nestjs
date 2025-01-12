import { Repository } from 'typeorm'
import { UserRepository } from '@modules/v1/user/repositories/user.repository'
import { UserEntity } from '@modules/v1/user/models/entities/user.entity'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserCreateDto } from '@modules/v1/user/models/dto/userCreate.dto'
import { AppErrorException } from '@common/exception/appError.exception'
import { AppHttpErrorException } from '@common/exception/appHttpError.exception'

describe('UserRepository', () => {
	let userRepository: UserRepository
	let typeormRepository: Repository<UserEntity>

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserRepository,
				{
					provide: getRepositoryToken(UserEntity, 'PGService'),
					useValue: {
						save: jest.fn(),
						findOne: jest.fn(),
					},
				},
			],
		}).compile()

		userRepository = module.get<UserRepository>(UserRepository)
		typeormRepository = module.get<Repository<UserEntity>>(
			getRepositoryToken(UserEntity, 'PGService'),
		)
	})

	it('Deve estar definido', () => {
		expect(userRepository).toBeDefined()
	})

	describe('Create', () => {
		it('Deve criar um novo usuário', async () => {
			const userCreateDto: UserCreateDto = {
				name: 'Jose',
				document: '12312345678',
				email: 'jose@gmail.com',
				phone: '31984565554',
			}
			await userRepository.create(userCreateDto)

			expect(typeormRepository.save).toHaveBeenCalledWith(userCreateDto)
			expect(typeormRepository.save).toHaveBeenCalledTimes(1)
		})

		it('Deve lançar um erro de banco de dados', async () => {
			const userCreateDto: UserCreateDto = {
				name: 'Jose',
				document: '12312345678',
				email: 'jose@gmail.com',
				phone: '31984565554',
			}

			jest
				.spyOn(typeormRepository, 'save')
				.mockRejectedValue(new Error('Indisponibilidade do banco de dados'))

			await expect(userRepository.create(userCreateDto)).rejects.toThrow(
				AppErrorException,
			)

			expect(typeormRepository.save).toHaveBeenCalledWith(userCreateDto)
			expect(typeormRepository.save).toHaveBeenCalledTimes(1)
		})
	})

	describe('findByEmail', () => {
		const userEmail = 'jose@email.com'

		it('Deve retornar um usuário, se ele existir', async () => {
			const DBUser: UserEntity = {
				id: 1,
				document: '2312121212',
				email: 'jose@email.com',
				name: 'jose',
				phone: '31666548985',
			}

			jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(DBUser)

			const result = await userRepository.findByEmail({ email: userEmail })

			expect(typeormRepository.findOne).toHaveBeenCalledWith({
				where: {
					email: userEmail,
				},
			})
			expect(typeormRepository.findOne).toHaveBeenCalledTimes(1)

			expect(result).toEqual(DBUser)
		})

		it('Deve retornar que o usuário não foi encontrado', async () => {
			jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(null)

			await expect(
				userRepository.findByEmail({ email: userEmail }),
			).rejects.toThrow(AppHttpErrorException)

			expect(typeormRepository.findOne).toHaveBeenCalledWith({
				where: {
					email: userEmail,
				},
			})
			expect(typeormRepository.findOne).toHaveBeenCalledTimes(1)
		})

		it('Deve lançar um erro de banco de dados', async () => {
			jest
				.spyOn(typeormRepository, 'findOne')
				.mockRejectedValue(new Error('Indisponibilidade do banco de dados'))

			await expect(
				userRepository.findByEmail({ email: userEmail }),
			).rejects.toThrow(AppErrorException)

			expect(typeormRepository.findOne).toHaveBeenCalledWith({
				where: {
					email: userEmail,
				},
			})
			expect(typeormRepository.findOne).toHaveBeenCalledTimes(1)
		})
	})
})
