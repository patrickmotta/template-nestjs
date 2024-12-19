import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { HttpExceptionFilter } from 'src/resources/v1/filters/httpException.filter'
import { RequestLogInterceptor } from 'src/resources/v1/interceptors/logger/requestLog.interceptor'
import { loadModules } from '@resources/utils/loadModules'

const modules = loadModules(__dirname)
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		...modules,
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
