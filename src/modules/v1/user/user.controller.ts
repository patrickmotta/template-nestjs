import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { UserCreateDto } from '@modules/v1/user/models/dto/userCreate.dto'
import { UserCreateService } from '@modules/v1/user/services/userCreate.service'
import { UserGetOneService } from '@modules/v1/user/services/userGetOne.service'
import { UserEntity } from './models/entities/user.entity'
import { UserGetAllService } from './services/userGetAll.service'
import { UserUpdateService } from './services/userUpdate.service'

@Controller('v1/user')
export class UserController {
	constructor(
		private readonly userCreateService: UserCreateService,
		private readonly userGetOneService: UserGetOneService,
		private readonly userGetAllService: UserGetAllService,
		private readonly userUpdateService: UserUpdateService,
	) {}

	@Get('/all')
	async findAll(): Promise<UserEntity[]> {
		return await this.userGetAllService.execute()
	}

	@Post()
	async create(@Body() userCreateDto: UserCreateDto): Promise<object> {
		return await this.userCreateService.execute(userCreateDto)
	}

	@Post('/update/:id')
	async update(
		@Body() userUpdate: Partial<UserCreateDto>,
		@Param('id') id: number,
	): Promise<object> {
		return await this.userUpdateService.execute({ id, userUpdate })
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<UserEntity> {
		return await this.userGetOneService.execute({ id })
	}
}
