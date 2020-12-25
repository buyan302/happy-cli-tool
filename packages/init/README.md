# happy-init

A cli tool to initial npm package.

A robust npm package should concern following aspects:

- code style: prettier...
- code quality: eslint,unit test...
- code compilation tool: babel,webpack...
- git hooks: precommit,prepublish...
- ci/cd: git actions
- documentation: README.md,CHANGELOG.md,component demo...

**happy-init** help developer initial robust npm package quickly.

## Installation

```shell
$ npm install happy-cli-tool happy-init -g
```

## Usage

### `happy init`

```shell
$ happy init [es|ts|react]
```

Happy-Init provides multiple kinds of boilerplate package,includes:

- [x] ES package
- [x] TS package
- [ ] React component library package

Each boilerplate contains complete development dependencies and workflow from initialization to release.

After run `happy init`, Happy-Npm-Cli will download specific boilerplate package files and then install dependencies.

![screenshots](https://github.com/buyan302/happy-cli-tool/blob/main/init.gif)
