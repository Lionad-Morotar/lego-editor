/**
 * @file 对编辑器相关约定进行校验，后续可拓展动态安装模块的能力
 */

// 判断数据是否符合安装模块所需的数据格式，
// 对应示例见 modules/index
const validInitModuleData = inits => {
  const validator = {
    title: v => typeof v === 'string' && v.length > 0,
    description: () => true,
    name: v => typeof v === 'string' && v.length > 0,
    component: v => typeof v === 'object',
    cover: v => typeof v === 'string' && v.length > 0,
    categories: v => v instanceof Array
  }
  const toValidKeys = Object.keys(inits)

  const validKeys = () => toValidKeys.every(key => {
    return validator[key] && validator[key](inits[key])
  })

  return validKeys()
}

export default {
  validInitModuleData
}
