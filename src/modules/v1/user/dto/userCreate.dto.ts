import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'

export class UserCreateDto {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsNotEmpty()
	@IsPhoneNumber('BR')
	phone: string

	@IsNotEmpty()
	@IsString()
	document: string
}
