import 'core-js/stable'
import 'regenerator-runtime/runtime'
import fs from 'fs-extra'
import execa from 'execa'
import path from 'path'
import { merge } from 'lodash'
import parser from 'dotenv'
import error from 'happy-cli-utils/lib/error'
import config from 'happy-cli-utils/lib/config'

// parse env args
function parseEnvArgs(args = []) {
  const env = {}

  args.forEach((arg) => {
    const [key, value] = arg.split('=')
    env[key] = value
  })

  return env
}

// get .env config
function getDotEnv(envPath = '.env') {
  const envAbsPath = path.join(config.root, envPath)
  return fs.existsSync(envAbsPath) ? parser.config({ path: envAbsPath }).parsed : {}
}

// inject env
function injectEnv({ cmdEnv, dotEnv }) {
  const env = merge({}, dotEnv, cmdEnv)

  Object.keys(env).forEach((key) => {
    process.env[key] = env[key]
  })
}

export default error((cmd, options) => {
  const cmdEnv = parseEnvArgs(options.env)
  const dotEnv = getDotEnv(options.dotenv)
  injectEnv({ cmdEnv, dotEnv })
  console.log(cmd, '\n')
  execa.command(`node ${config.crossEnvBin} ${cmd}`, { stdio: 'inherit' })
})
