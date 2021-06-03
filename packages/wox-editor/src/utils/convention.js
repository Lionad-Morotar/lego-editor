/**
 * @file 对编辑器相关约定进行校验，后续可拓展动态安装模块的能力
 */

// 判断数据是否符合安装模块所需的数据格式，
// 对应示例见 modules/index
const validInitModuleData = inits => {
  const validator = {
    title: v => typeof v === 'string' && v.length > 0,
    description: () => true,
    // thanks: () => true,
    component: v => typeof v === 'object',
    name: v => typeof v === 'string' && v.length > 0,
    cover: () => true,
    // cover: v => typeof v === 'string' && v.length > 0,
    categories: v => v instanceof Array
  }
  const toValidKeys = Object.keys(inits)
  const errorKey = toValidKeys.find(key => {
    return !(validator[key] && validator[key](inits[key]))
  })

  return errorKey
}

export default {
  validInitModuleData
}
