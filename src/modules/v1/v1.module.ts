import { Module } from '@nestjs/common'

import { loadModules } from '@resources/utils/loadModules'

const v1Modules = loadModules(__dirname)

@Module({
	imports: v1Modules,
})
export class V1Module {}
