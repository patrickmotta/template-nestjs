import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	)

	useContainer(app.select(AppModule), { fallbackOnErrors: true })
	await app.listen(process.env.SERVICE_PORT ?? 3000)
}
bootstrap()
