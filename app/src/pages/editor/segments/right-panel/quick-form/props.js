import { Input } from 'element-ui'

// const merge = (...args) => Object.assign(...args)

/**
 * Props 规范规定了模块的依赖的数据的类型
 */
export default {

  /**
   * 基础类型，如 String、Number
   * 可类比为 VueJS 中给 Props 传入的 Type
   */

  // 字符串类型
  string(config) {
    return {
      type: String,
      default: config.default,
      config: {
        component: Input.name,
        ...config
      }
    }
  },

  /**
   * 复合类型
   * 页面右侧配置面板是根据 UI 规范编写的
   */

  // text(config) {
  //   return {
  //     type: String,
  //     default: config.default,
  //     config
  //   }
  // },

  /**
   * 自定义类型
   */

  // customize(config) {
  //   return {
  //     type: [String, Number, Object],
  //     default: config.default,
  //     component: config.component,
  //     config
  //   }
  // }

}
