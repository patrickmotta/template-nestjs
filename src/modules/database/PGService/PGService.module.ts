import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import PGServiceConfigDatabase from './config/PGService.config.database'

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			name: 'PGService',
			useClass: PGServiceConfigDatabase,
			inject: [PGServiceConfigDatabase],
		}),
	],
	exports: [TypeOrmModule],
})
export class PGServiceModule {}
