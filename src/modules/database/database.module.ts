import { Global, Module } from '@nestjs/common'
import { loadModules } from '@resources/utils/loadModules'

const DBModules = loadModules(__dirname)
@Global()
@Module({
	imports: DBModules,
	exports: DBModules,
})
export class DatabaseModule {}
