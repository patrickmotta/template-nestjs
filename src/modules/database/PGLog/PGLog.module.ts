import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import PGLogsConfigDatabase from './config/PGLogs.config.database'
import { ErrorLogEntity } from 'src/modules/v1/log/entities/error.entity'
import { RequestLogEntity } from 'src/modules/v1/log/entities/request.entity'
import { SendLogEntity } from 'src/modules/v1/log/entities/send.entity'

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			name: 'PGLogs',
			useClass: PGLogsConfigDatabase,
			inject: [PGLogsConfigDatabase],
		}),

		TypeOrmModule.forFeature(
			[ErrorLogEntity, RequestLogEntity, SendLogEntity],
			'PGLogs',
		),
	],
	exports: [TypeOrmModule],
})
export class PGLogModule {}
