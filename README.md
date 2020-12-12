# Happy-Npm-Cli

Happy-Npm-Cli is a cli tool that help you develop and release npm package easily.

> Initial easily, develop quickly, publish confidently.

## Installation

```shell
$ npm install happy-npm-cli -g
```

## Usage

### `happy init`

```shell
$ happy init [es|ts|react]
```

A robust npm package should concern following aspects:

- code style: prettier...
- code quality: eslint,unit test...
- code compilation tool: babel,webpack...
- git hooks: precommit,prepublish...
- ci/cd: git actions
- documentation: README.md,CHANGELOG.md...

Happy-Init provides multiple kinds of boilerplate package,includes:

- [x] ES package
- [ ] TS package
- [ ] React component package

Each boilerplate contains complete development dependencies and workflow from initialization to release.

After run `happy init`, Happy-Npm-Cli will download specific boilerplate package files and then install dependencies.

![screenshots](./screenshot.gif)

### `happy compare`

Compare packages' download frequency,quality,git star count,etc from https://www.npmjs.com/.

### `happy publish`

Publish package to git or npm registry.

### `happy run`

Execute npm script with environment variables.

## More Command?

Leave a issue [here](./issues).
