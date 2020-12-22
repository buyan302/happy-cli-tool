# Happy-Npm-Cli

Happy-Npm-Cli is a cli tool that help you develop and release npm package easily.

Happy-Npm-Cli is designed for:

> Initial easily, develop quickly, publish confidently.

Happy-Npm-Cli contains these following commands:

- [`happy init`](#happy-init)
- [`happy run`](#happy-run)
- [`happy compare`](#happy-compare)

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
- documentation: README.md,CHANGELOG.md,component demo...

Happy-Init provides multiple kinds of boilerplate package,includes:

- [x] ES package
- [x] TS package
- [ ] React component library package

Each boilerplate contains complete development dependencies and workflow from initialization to release.

After run `happy init`, Happy-Npm-Cli will download specific boilerplate package files and then install dependencies.

![screenshots](https://github.com/buyan302/happy-init/blob/main/init.gif)
 
### `happy run`

Inject environment variables into command, compatible with different os.

```shell
$ happy run [cmd] [--env <envConfig>] [--dotenv <dotenv>]
```

- `--env <envConfig>`: environment variables config
- `--dotenv <dotenv>`: `.env` file path, default `.env`

![screenshots](https://github.com/buyan302/happy-init/blob/main/run.gif)

Environment variables come from `process.env`, command line, and `.env` file.

Environment variables priority: command line  > `.env` > `process.env`.

For example:

```js
process.env.NODE_ENV=development
```

```yml
# .env
NODE_ENV=test
```

Then executing `happy run \"echo $NODE_ENV\" --env NODE_ENV=production` equals `NODE_ENV=production echo $NODE_ENV`

### `happy compare`

Compare packages' download frequency,quality,git star count,etc from https://www.npmjs.com/.

```shell
$ happy compare [package1] [package2] ...
```

![screenshots](https://github.com/buyan302/happy-init/blob/main/compare.gif)

## More Command?

Leave a issue [here](https://github.com/buyan302/happy-init/issues).
