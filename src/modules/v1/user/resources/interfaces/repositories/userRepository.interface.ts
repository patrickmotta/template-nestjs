import { UserCreateDto } from '@modules/v1/user/models/dto/userCreate.dto'
import { UserEntity } from '@modules/v1/user/models/entities/user.entity'

export type ICreateInput = UserCreateDto

export type ICreateOutput = void

export type IFindAllOutput = UserEntity

export interface IFindByDocumentInput {
	document: string
}
export type IFindByDocumentOutput = UserEntity

export interface IFindByEmailInput {
	email: string
}
export type IFindByEmailOutput = UserEntity

export interface IFindByIdInput {
	id: number
}
export type IFindByIdOutput = UserEntity

export type IUpdateInput = UserEntity

export interface IUserRepository {
	create(input: ICreateInput): Promise<ICreateOutput>
	findAll(): Promise<IFindAllOutput[]>
	findByDocument(input: IFindByDocumentInput): Promise<IFindByDocumentOutput>
	findByEmail(input: IFindByEmailInput): Promise<IFindByEmailOutput>
	findById(input: IFindByIdInput): Promise<IFindByIdOutput>
	update(input: IUpdateInput): Promise<void>
}
