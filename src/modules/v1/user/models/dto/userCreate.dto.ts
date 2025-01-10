import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'
import { EmailIsUnique } from '../../resources/validators/emailIsUnique.validator'

export class UserCreateDto {
	@IsNotEmpty()
	@IsString()
	name!: string

	@IsNotEmpty()
	@IsEmail()
	@EmailIsUnique()
	email!: string

	@IsNotEmpty()
	@IsPhoneNumber('BR')
	phone!: string

	@IsNotEmpty()
	@IsString()
	document!: string
}
