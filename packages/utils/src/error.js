import chalk from 'chalk'

export default (func, cb) => (...args) => {
  try {
    return func(...args)
  } catch (e) {
    if (cb) {
      cb()
    }
    console.error(chalk.red(e.message))
  }
}
