const path = require('path')
const { spawn } = require('child_process')
const chalk = require('chalk')

const logger = {
  set stdout(buffer) {
    process.stdout.write(buffer.toString(), 'utf8')
  },
  info: (message) => {
    logger.stdout = chalk.bold(message)
  },
  warn: (message) => {
    logger.stdout = chalk.black.bgYellow.bold(message)
  },
  success: (message) => {
    logger.stdout = chalk.black.bgGreen.bold(message)
  },
  error: (message) => {
    logger.stdout = chalk.black.bgRed.bold.strikethrough(message)
  }
}

function processCmdInTerminal(cmd, config) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, {
      shell: true,
      env: process.env,
      stdio: 'inherit',
      ...config
    })
    
    child.on('error', reject)
    child.on('exit', resolve)
  })
}

function getWorkDirPath(dir) {
  return path.join(process.cwd(), '/', dir)
}

module.exports = {
  logger,
  getWorkDirPath,
  processCmdInTerminal
}
