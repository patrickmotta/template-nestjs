import { PartialType } from '@nestjs/swagger'
import { UserCreateDto } from '@modules/v1/user/models/dto/userCreate.dto'

export class UpdateUserDto extends PartialType(UserCreateDto) {}
