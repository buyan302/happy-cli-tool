#!/usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')
const { init, compare, run} = require('../lib')

commander.version(pkg.version, '-v --version').usage('<command> [options]')

commander.command('init [template]').description('init specific type of npm package').action(init)
commander.command('compare <packages...>').description('compare packages info').action(compare)
commander
  .command('run <cmd>')
  .description('Inject environment variables into any command, compatible with different os')
  .option('--env <env...>', 'set environment variables')
  .option('--dotenv <dotenv>', '.env file path')
  .action(run)

commander.parse(process.argv)
