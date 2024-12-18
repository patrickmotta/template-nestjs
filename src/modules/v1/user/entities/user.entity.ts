import { projectName } from 'src/resources/v1/utils/projectName'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'users', schema: projectName, database: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn({ name: 'id', type: 'int' })
	id?: number

	@Column({ name: 'name', type: 'varchar', length: 200 })
	name: string

	@Column({ unique: true })
	email: string

	@Column({ unique: true })
	phone: string

	@Column({ unique: true })
	document: string

	@CreateDateColumn({ name: 'created_at' })
	createdAt?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updateAt?: Date
}
