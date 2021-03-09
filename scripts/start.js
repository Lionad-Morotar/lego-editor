const { getWorkDirPath, processCmdInTerminal } = require('./utils')

processCmdInTerminal(`cd ${getWorkDirPath('app')} && yarn serve`)
processCmdInTerminal(`cd ${getWorkDirPath('server')} && yarn run start:dev`)
