import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Query,
	Version,
} from '@nestjs/common'
import { UserCreateDto } from './dto/userCreate.dto'
import { UserCreateService } from './services/userCreate.service'
import { UserGetService } from './services/userGet.service'

@Controller('user')
export class UserController {
	constructor(
		private readonly userCreateService: UserCreateService,
		private readonly userGetService: UserGetService,
	) {}

	@Version('1')
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
