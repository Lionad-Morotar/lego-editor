import Element from 'element-ui'
import QuickForm from './index'

const merge = (...args) => Object.assign(...args)

/**
 * DS 定义了模块的数据与模块样式以怎样的形式聚合
 * DS 即 DataStructures
 * DS 永远会返回“新”数据，举个例子，
 * @example
 * DS.text === DS.text // 结果为 false
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
  get image() {
    return {
      url: '',
      objectFit: 'contain',
      objectPosition: 'center',
    }
  },
}

/**
 * 生成精简的样式对象
 * @todo refactor CSS 多值合并
 */
const genStyles = (val = {}) => {
  const {
    textAlign,
    bold,
    italic,
    underLine,
    strikeThrough,
    objectFit,
    objectPosition,
  } = val
  const res = {
    textDecoration: [],
  }

  /* text */
  if (textAlign) res.textAlign = textAlign
  if (bold) res.fontWeight = 'bold'
  if (italic) res.fontStyle = 'italic'
  if (underLine) res.textDecoration.push('underLine')
  if (strikeThrough) res.textDecoration.push('line-through')

  /* image */
  if (objectFit) res.objectFit = objectFit
  if (objectPosition) res.objectPosition = objectPosition

  /* clean useless */
  if (res.textDecoration.length) {
    res.textDecoration = res.textDecoration.join(' ')
  } else {
    delete res.textDecoration
  }

  return res
}

/**
 * Props 定义不同的数据类型，以约定不同类型的数据结构及在右侧编辑面板中如何配置该数据
 * @see https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
 * 和 Vue 的 Props 验证不同之处在于：
 * 1. default 默认值字段在返回对象或数组时不需要显式用工厂函数去返回值
 *    （不过还是会出现 Vue 警告，需要想个办法关一下）
 * 2. validator 自定义校验函数返回两种格式信息：
 *    undefined 或不返回，代表校验通过；失败的原因（字符串），代表校验失败
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
      _valueKey: 'text',
      config: {
        component: QuickForm.Text,
        ...config,
      },
    }
  },

  // 图片链接，可设置图片缩放、对齐等样式
  image(config) {
    const defaultVal =
      typeof config.default === 'string'
        ? merge(DS.image, { url: config.default })
        : merge(DS.image, config.default)
    return {
      type: Object,
      default: defaultVal,
      _valueKey: 'url',
      config: {
        component: QuickForm.Image,
        ...config,
      },
    }
  },

  /**
   * 自定义类型
   * 用于配置自定义编辑面板
   */

  custom(config) {
    return {
      type: config.type || [String, Number, Object],
      default: config.default,
      config: {
        component: config.component,
        ...config,
      },
    }
  },
}

Props.DS = DS
Props.genStyles = genStyles

export default Props
