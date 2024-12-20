import { Module } from '@nestjs/common'

import { dynamicImport } from '@resources/utils/dynamicImport'

const v1Modules = dynamicImport({
	dir: __dirname,
	extension: 'module',
})

@Module({
	imports: v1Modules,
})
export class V1Module {}
