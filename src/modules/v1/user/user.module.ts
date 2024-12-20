import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserRepository } from './repositories/user.repository'
import { UserCreateService } from './services/userCreate.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { UserGetService } from './services/userGet.service'
import { dynamicImport } from '@resources/utils/dynamicImport'

const services = dynamicImport({
	dir: __dirname,
	extension: 'service',
})

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity], 'PGService')],
	controllers: [UserController],
	providers: [UserRepository, ...services],
	exports: [...services],
})
export class UserModule {}
