import * as fs from 'fs'
import * as path from 'path'

export function loadModules(dir: string) {
	const modulesDir = path.join(dir)
	const subdirs = fs.readdirSync(modulesDir)
	const modules = []

	subdirs.forEach((subdir) => {
		const subdirPath = path.join(modulesDir, subdir)

		if (fs.statSync(subdirPath).isDirectory()) {
			const files = fs.readdirSync(subdirPath)

			files.forEach((file) => {
				if (file.endsWith('.module.js')) {
					const modulePath = path.join(subdirPath, file)

					const filterFileName = file.split('.')[0]
					const className =
						filterFileName.charAt(0).toUpperCase() +
						filterFileName.slice(1) +
						'Module'
					// eslint-disable-next-line @typescript-eslint/no-require-imports
					const moduleExports = require(modulePath)
					modules.push(moduleExports[className])
				}
			})
		}
	})

	return modules
}
