import fs from 'fs-extra'
import execa from 'execa'
import path from 'path'
import { get, merge } from 'lodash'
import parser from 'dotenv'
import error from '../utils/error'
import config from '../config/global'

// parse env args
function parseEnvArgs(args = []) {
  const env = {}

  args.forEach((arg) => {
    const [key, value] = arg.split('=')
    env[key] = value
  })

  return env
}

// get package script
function getScriptCmd(script) {
  const pkgJson = fs.readJSONSync(config.pkgPath)
  const cmd = get(pkgJson, `scripts.${script}`)

  if (!cmd) {
    throw new Error(`happy-run: script "${script}" not defined`)
  }

  return cmd
}

// get package env config
function getPkgEnv(script) {
  return get(fs.readJSONSync(config.pkgPath), `env.${script}`, {})
}

// get .env config
function getDotEnv(envPath = '.env') {
  const envAbsPath = path.join(config.root, envPath)
  return fs.existsSync(envAbsPath) ? parser.config({ path: envAbsPath }).parsed : {}
}

// inject env
function injectEnv(cmd, { cmdEnv, pkgEnv, dotEnv }) {
  const env = merge({}, dotEnv, pkgEnv, cmdEnv)
  const envStr = Object.keys(env)
    .reduce((acc, key) => acc.concat(`${key}=${env[key]}`), [])
    .join(' ')

  return `${envStr} ${cmd}`
}

export default error((script, options) => {
  const cmd = getScriptCmd(script)
  const cmdEnv = parseEnvArgs(options.env)
  const pkgEnv = getPkgEnv(script)
  const dotEnv = getDotEnv(options.dotenv)
  const realCmd = injectEnv(cmd, { cmdEnv, pkgEnv, dotEnv })
  console.log(realCmd, '\n')
  execa.command(`node ${config.crossEnvBin} ${realCmd}`, { stdio: 'inherit' })
})
