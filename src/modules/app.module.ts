import { Module } from '@nestjs/common'
import { V1Module } from './v1/v1.module'
import { DatabaseModule } from '../database/database.module'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { HttpExceptionFilter } from 'src/resources/v1/filters/httpException.filter'
import { RequestLogInterceptor } from 'src/resources/v1/interceptors/logger/requestLog.interceptor'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		V1Module,
		DatabaseModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: RequestLogInterceptor,
		},
		{ provide: APP_FILTER, useClass: HttpExceptionFilter },
	],
})
export class AppModule {}
