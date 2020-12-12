#!/usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')
const { init, compare } = require('../lib')

commander.version(pkg.version, '-v --version').usage('<command> [options]')

commander.command('init [template]').description('init specific type of npm package').action(init)
commander.command('compare <packages...>').description('compare packages info').action(compare)

commander.parse(process.argv)
