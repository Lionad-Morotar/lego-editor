import { Input } from 'element-ui'

// TODO utils
const deepClone = m => m

// Props 规范规定了模块的依赖的数据的类型
export default {
  string(arg) {
    const { label, required, validator } = arg || {}
    return {
      type: String,
      default: arg.default,
      config: {
        value: deepClone(arg.default),
        component: Input.name,
        require: !!required,
        validator,
        label,
      },
    }
  },
}
