import execa from 'execa'
import assert from 'assert'
import path from 'path'
import merge from 'lodash.merge'
import fs from 'fs-extra'
import glob from 'glob'
import ora from 'ora'
import prompts from 'prompts'
import config from './config'

const rootDir = process.cwd()
const bplTmpPath = path.join(rootDir, 'happy-init/boilerplate')
const commonFilePath = path.join(bplTmpPath, 'common')
const extendFilePath = path.join(bplTmpPath, 'extend')

function validateArgs(type = 'es') {
  assert(config.pkgTypes.includes(type), 'unknown package type, only support es,ts,react')
}

// origin package info
function getOriginInfo() {
  const parent = path.join(rootDir, '../')
  const dirName = path.relative(parent, rootDir)

  return {
    name: dirName,
    version: '1.0.0',
    description: '',
    author: '',
    license: 'ISC',
  }
}

// handle input info
async function handleInput(origin, type = 'es') {
  const typeChoices = config.pkgTypes.map((t) => ({ title: t, value: t }))
  return prompts(
    [
      {
        type: 'select',
        name: 'pkgType',
        message: 'package type',
        initial: typeChoices.findIndex(({ value }) => value === type),
        choices: typeChoices,
      },
    ].concat(
      Object.keys(origin).map((key) => ({
        type: 'text',
        name: key,
        message: key,
        initial: origin[key],
      }))
    ),
    {
      onCancel: () => {
        process.exit(0)
      },
    }
  )
}

// download boilerplate
function downloadBpl() {
  return execa.command(`git clone https://github.com/buyan302/happy-init.git`)
}

// copy common to root
async function copyCommonFiles(type) {
  // copy and replace
  await execa.command(`cp -a ${commonFilePath}/. ${rootDir}`)
  return execa.command(`cp -a ${bplTmpPath}/${type}/. ${rootDir}`)
}

// copy extend files
function copyExtendFiles(inputValues) {
  const files = glob.sync('**', { cwd: extendFilePath, dot: true })

  return Promise.all(
    files.map((file) => {
      const filePath = path.join(extendFilePath, file)
      const rootFilePath = path.join(rootDir, file)
      // extend file content
      if (fs.existsSync(rootFilePath)) {
        const json1 = fs.readJsonSync(filePath)
        const json2 = fs.readJsonSync(rootFilePath)
        return fs.writeJson(rootFilePath, merge({}, json1, json2, inputValues), { spaces: 2 })
      }

      // copy file to root directly
      return execa.command(`cp ${filePath} ${rootDir}`)
    })
  )
}

// clear invalid files
function clearFiles() {
  return execa.command(`rm -rf happy-init`)
}

// rename _pkg.json
function renamePkgJson() {
  return execa.command(`mv _pkg.json package.json`)
}

// npm install
function npmInstall() {
  return execa.command(`npm install`, { stdio: 'inherit' })
}

// error-handler
function handleError(e) {
  console.error('\x1b[31m%s\x1b[0m', `happy-init: ${e.message}`)
  process.exit(1)
}

export default async (type) => {
  const progress = ora()
  try {
    // preprocess
    validateArgs(type)
    const origin = getOriginInfo()
    const inputValues = await handleInput(origin, type)
    const { pkgType } = inputValues
    delete inputValues.pkgType

    // download process
    progress.start(`downloading ${pkgType} package from git...`)
    await downloadBpl(pkgType)
    await copyCommonFiles(pkgType)
    await copyExtendFiles(inputValues)
    await clearFiles()
    await renamePkgJson()
    progress.succeed(`downloading compelete, start installing...\n`)

    // install process
    await npmInstall()
    progress.succeed(`installing compelete, happy coding!`)
  } catch (e) {
    progress.stop()
    handleError(e)
  }
}
