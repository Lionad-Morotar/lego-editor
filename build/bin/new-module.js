console.log()
process.on('exit', () => {
  console.log()
})

if (!process.argv[2]) {
  console.error('[模块名]必填')
  process.exit(1)
}

const path = require('path')
const fileSave = require('file-save')

// TODO 校验 name，kabe-case
const name = process.argv[2]
// const description = process.argv[3] || name
const moduleSavePath = path.resolve(__dirname, '../../modules', name)

/* 生成 components.json */
const componentsFile = require('../../modules/components.json')
if (componentsFile[name]) {
  console.error(`模块 ${name} 已存在，请重新命名。`)
  process.exit(1)
}
componentsFile[name] = `./modules/${name}`
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n')

/* 创建文件 */
const Files = getFileTemplates()
Files.forEach(file => {
  fileSave(path.join(moduleSavePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n')
})

console.log('DONE!')

/* ... */

// 获取示例模板内容
function getFileTemplates () {
  return [
    {
      filename: 'index.vue',
      content: `<template>
  <div class="lego-${name}" />
</template>

<script>
import Props from '@/models/props'
export default {
  name: 'lego-${name}',
  props: {
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.lego-${name} {
}
</style>`
    }
  ]
}
