# happy-run

Inject environment variables into command, compatible with different os.

## Installation

```shell
$ npm install happy-cli-tool happy-run -g
```

## Usage

```shell
$ happy run [cmd] [--dotenv <dotenv>]
```

- `--dotenv <dotenv>`: `.env` file path, default `.env`

![screenshots](https://github.com/buyan302/happy-cli-tool/blob/main/run.gif)

## Caveats

Environment variables come from `process.env`, command line, and `.env` file.

Environment variables priority: command line  > `.env` > `process.env`.

For example, suppose your environment has been set `process.env.NODE_ENV=development`,your `.env` file looks like:

```yml
# .env
NODE_ENV=test
```

Then executing `happy run NODE_ENV=production "echo NODE_ENV=\$NODE_ENV"` will output `NODE_ENV=production`
