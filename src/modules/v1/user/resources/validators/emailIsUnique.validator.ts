import { Injectable } from '@nestjs/common'
import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator'
import { UserGetOneService } from '../../services/userGetOne.service'

@Injectable()
@ValidatorConstraint({ name: 'EmailIsUnique', async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
	constructor(private readonly userGetOneService: UserGetOneService) {
		//
	}

	defaultMessage(): string {
		return 'O email já esta sendo utilizado'
	}

	async validate(email: string): Promise<boolean> {
		try {
			const userExist = await this.userGetOneService.execute({ email })
			return !userExist
		} catch {
			return true
		}
	}
}

export const EmailIsUnique = (validationOptions?: ValidationOptions) => {
	return (object: object, property: string): void => {
		registerDecorator({
			target: object.constructor,
			propertyName: property,
			options: validationOptions,
			constraints: [],
			validator: EmailIsUniqueValidator,
		})
	}
}
