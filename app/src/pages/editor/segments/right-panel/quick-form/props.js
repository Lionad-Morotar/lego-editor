import Element from 'element-ui'
import QuickForm from './index'

const merge = (...args) => Object.assign(...args)

/**
 * DS 定义了模块的数据与模块样式以怎样的形式聚合
 * DS 即 DataStructures
 */
const DS = {
  get text() {
    return {
      text: '',
      textAlign: 'left',
      bold: false,
      italic: false,
      underLine: false,
      strikeThrough: false,
    }
  },
}

/**
 * 生成精简的样式对象
 * @todo refactor CSS 值合并
 */
const genStyles = (val = {}) => {
  const { textAlign, bold, italic, underLine, strikeThrough } = val
  const res = {}
  if (textAlign) res.textAlign = textAlign
  if (bold) res.fontWeight = 'bold'
  if (italic) res.fontStyle = 'italic'
  if (underLine) res.textDecoration = 'underLine'
  if (strikeThrough) res.textDecoration = 'line-through'
  return res
}

/**
 * Props 规范规定了模块的依赖的数据的类型
 */
const Props = {
  /**
   * 基础类型，如 String、Number
   * 可类比为 VueJS 中给 Props 传入的 Type
   */

  string(config) {
    return {
      type: String,
      default: config.default,
      config: {
        component: Element.Input,
        ...config,
      },
    }
  },

  number(config) {
    return {
      type: Number,
      default: config.default,
      config: {
        component: Element.InputNumber,
        ...config,
      },
    }
  },

  /**
   * 复合类型
   */

  // 字符串，可设置文本居中、加粗等样式
  text(config) {
    const defaultVal =
      typeof config.default === 'string'
        ? merge(DS.text, { text: config.default })
        : merge(DS.text, config.default)
    return {
      type: Object,
      default: defaultVal,
      defaultDisplay: defaultVal.text,
      config: {
        component: QuickForm.Text,
        ...config,
      },
    }
  },

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

Props.DS = DS
Props.genStyles = genStyles

export default Props
