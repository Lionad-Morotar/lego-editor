// 项目初始化脚本
const { logger, getWorkDirPath, processCmdInTerminal } = require('./utils')
const dirs = ['app', 'server']

// 安装项目依赖
Promise.all(
  dirs
    .map(dir => getWorkDirPath(dir))
    .map(workDir => processCmdInTerminal(`cd ${workDir} && yarn install`))
)
.then(() => {
  logger.success('all dependencies installed')
})
.catch((err) => {
  logger.error(err.message)
})
