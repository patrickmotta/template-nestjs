import { Global, Module } from '@nestjs/common'
import { PGServiceModule } from './PGService/PGService.module'
import { PGLogModule } from './PGLog/PGLog.module'

@Global()
@Module({
	imports: [PGServiceModule, PGLogModule],
	exports: [PGServiceModule, PGLogModule],
})
export class DatabaseModule {}
