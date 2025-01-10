import { Module } from '@nestjs/common'
import { UserController } from '@modules/v1/user/user.controller'
import { UserRepository } from '@modules/v1/user/repositories/user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@modules/v1/user/models/entities/user.entity'
import { dynamicImport } from '@common/utils/dynamicImport'

const services = dynamicImport({
	dir: __dirname,
	extension: 'service',
})

const validators = dynamicImport({
	dir: __dirname + '/resources',
	extension: 'validator',
})

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity], 'PGService')],
	controllers: [UserController],
	providers: [UserRepository, ...services, ...validators],
	exports: [...services],
})
export class UserModule {}
