#!/usr/bin/env node

const commander = require('commander')
const pkg = require('./package.json')

function loadCmd(cmd) {
  return function (...args) {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    return require(cmd).default(...args)
  }
}

commander.version(pkg.version, '-v --version').usage('<command> [options]')

commander
  .command('init [template]')
  .description('init specific type of npm package')
  .action(loadCmd('happy-init'))
commander
  .command('compare <packages...>')
  .description('compare packages info')
  .action(loadCmd('happy-compare'))
commander
  .command('run <cmd>')
  .description('Inject environment variables into any command, compatible with different os')
  .option('--env <env...>', 'set environment variables')
  .option('--dotenv <dotenv>', '.env file path')
  .action(loadCmd('happy-run'))

commander.parse(process.argv)
