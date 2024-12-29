import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Query,
	Version,
} from '@nestjs/common'
import { UserCreateDto } from '@modules/v1/user/models/dto/userCreate.dto'
import { UserCreateService } from '@modules/v1/user/services/userCreate.service'
import { UserGetService } from '@modules/v1/user/services/userGet.service'

@Controller('v1/user')
export class UserController {
	constructor(
		private readonly userCreateService: UserCreateService,
		private readonly userGetService: UserGetService,
	) {}

	@Post()
	async create(@Body() userCreateDto: UserCreateDto) {
		return await this.userCreateService.execute(userCreateDto)
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.userGetService.execute({ id })
	}

	@Get()
	findQuery(@Query() query: Partial<UserCreateDto>) {
		return this.userGetService.execute(query)
	}
}
