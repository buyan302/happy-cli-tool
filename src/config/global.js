import path from 'path'

export default {
  root: process.cwd(),
  pkgPath: path.join(process.cwd(), 'package.json'),
  pkgTypes: ['es', 'ts', 'react'],
  registry: 'https://registry.npmjs.org',
  registryHome: 'https://www.npmjs.com',
  crossEnvBin: require.resolve('cross-env/src/bin/cross-env-shell.js'),
}
