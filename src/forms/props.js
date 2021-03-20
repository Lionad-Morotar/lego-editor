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
  get text () {
    return {
      text: '',
      fontSize: 14,
      lineHeight: 1,
      letterSpacing: 0,
      color: '#333',
      textAlign: 'left',
      bold: false,
      italic: false,
      underLine: false,
      strikeThrough: false
    }
  },
  get image () {
    return {
      url: '',
      objectFit: 'contain',
      objectPosition: 'center'
    }
  }
}

/**
 * 生成精简的样式对象
 * @todo refactor CSS 多值合并
 */
const genStyles = (val = {}) => {
  const {
    layout,
    fontSize,
    lineHeight,
    letterSpacing,
    color,
    textAlign,
    bold,
    italic,
    underLine,
    strikeThrough,
    objectFit,
    objectPosition
  } = val
  const res = {
    textDecoration: []
  }

  /* text */
  if (fontSize) res.fontSize = fontSize + 'px'
  if (lineHeight) res.lineHeight = lineHeight
  if (letterSpacing) res.letterSpacing = letterSpacing + 'px'
  if (color) res.color = color
  if (textAlign) res.textAlign = textAlign
  if (bold) res.fontWeight = 'bold'
  if (italic) res.fontStyle = 'italic'
  if (underLine) res.textDecoration.push('underLine')
  if (strikeThrough) res.textDecoration.push('line-through')

  /* image */
  if (objectFit) res.objectFit = objectFit
  if (objectPosition) res.objectPosition = objectPosition

  /* layout */
  if (layout) {
    res.position = layout.auto ? 'relative' : 'absolute'
    if (!layout.auto) {
      res.width = layout.width ? (layout.width + 'px') : 'auto'
      res.height = layout.height ? (layout.height + 'px') : 'auto'
      const directions = ['top', 'bottom', 'left', 'right']
      directions.forEach(k => {
        if (layout[k]) res[k] = layout[k] + 'px'
      })
      res.zIndex = 1
    }
  }

  /* clean useless */
  if (res.textDecoration.length) {
    res.textDecoration = res.textDecoration.join(' ')
  } else {
    delete res.textDecoration
  }

  return res
}

/**
 * 从配置实例生成初始值
 * @param prop 配置实例
 */
const genDefaults = prop => {
  const clone = obj => {
    if (obj instanceof Object) {
      const initial = obj instanceof Array ? [] : {}
      return Object.entries(obj).reduce((h, [k, v]) => {
        if (v instanceof Prop) {
          h[k] = clone(v.default)
        } else {
          h[k] = clone(v)
        }
        return h
      }, initial)
    } else {
      return obj
    }
  }
  return clone(prop.default)
}

/**
 * Props 定义不同的数据类型，以约定不同类型的数据结构及在右侧编辑面板中如何配置该数据
 * @see https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
 * @todo 也许可以和 Vue 的 Props 规范完全统一？
 * 和 Vue 的 Props 验证不同之处在于：
 * 1. default 默认值字段在返回对象或数组时不需要显式用工厂函数去返回值，
 *    所以正常渲染时，需要用 genVueProps 把 Prop 还原未 Vue 规范的 Props
 * 2. validator 自定义校验函数返回两种格式信息：
 *    undefined 或不返回，代表校验通过；失败的原因（字符串），代表校验失败
 */
const Props = {
  /**
   * 基础类型，如 String、Number
   * 可类比为 VueJS 中给 Props 传入的 Type
   */

  string (config) {
    return new Prop(
      {
        type: String,
        component: QuickForm.BaseText
      },
      config
    )
  },

  number (config) {
    return new Prop(
      {
        type: Number,
        component: QuickForm.BaseNumber
      },
      config
    )
  },

  /**
   * 复合类型
   */

  // 字符串，可设置文本居中、加粗等样式
  text (config) {
    const defaultVal =
      typeof config.default === 'string'
        ? merge(DS.text, { text: config.default })
        : merge(DS.text, config.default)
    return new Prop(
      {
        type: Object,
        default: defaultVal,
        _valueKey: 'text',
        component: QuickForm.StyledText
      },
      config
    )
  },
  textarea (config) {
    return Props.text({
      component: QuickForm.StyledTextarea,
      ...config
    })
  },

  // 图片链接，可设置图片缩放、对齐等样式
  image (config) {
    const defaultVal =
      typeof config.default === 'string'
        ? merge(DS.image, { url: config.default })
        : merge(DS.image, config.default)
    return new Prop(
      {
        type: Object,
        default: defaultVal,
        _valueKey: 'url',
        component: QuickForm.StyledImage
      },
      config
    )
  },

  /**
   * 高级类型
   */

  // 用于配置自定义编辑面板
  custom (config) {
    return new Prop(
      {
        type: config?.type || [String, Number, Object, Array, Function] // remove ?
      },
      config
    )
  },

  // 使用 Pass 标记该 Props 是父组件传递过来的而非依赖项
  pass (config) {
    return new Prop({}, {
      ...config,
      component: config?.component,
      pass: true
    })
  }
}

/**
 * 正常渲染（如 C 端渲染）时，Props 约定需要转成 Vue Props 约定
 * @see https://cn.vuejs.org/v2/guide/components-props.html#ad
 */
function genVueProps (propsInstance = {}) {
  const genVueProp = propInstance => ({
    type: propInstance.type,
    required: propInstance.required,
    default: () => propInstance.default
  })
  return Object.entries(propsInstance).reduce((h, [k, v]) => {
    // TODO 处理 Props 约定嵌套的结构
    if (v instanceof Prop) {
      h[k] = genVueProp(v)
    } else {
      h[k] = v
    }
    return h
  }, {})
}

/* 配置实例 */
// TODO key configurable
function Prop (base, config = {}) {
  const { _valueKey: k } = base
  const prop = Object.assign(
    Object.create(Prop.prototype),
    {
      default: config.default,
      // 保留依赖项最后一次校验失败的错误信息
      lastError: '',
      // 从依赖项值中获得可供页面展示的值
      // 如从 DS.text 结构中获得 DS.text.text
      getDisplayValue: propVal => (k ? propVal[k] : propVal),
      // 当展示值为空,页面上仍应展示 Fallback 而不是空值
      injectDisplayValueFallbackMaybe: propVal => {
        const noFallback = !(prop.config.fallback === true)
        const displayValue = k ? prop.default[k] : prop.default
        return noFallback
          ? propVal
          : displayValue
            ? Object.assign(propVal, {
              [k]: displayValue
            })
            : undefined
      },
      // 当依赖值发生变动时，调用此函数以返回一个校验后的值
      // todo 完善逻辑
      // eslint-disable-next-line
      genData: (newValue, oldValue) => {
        console.log('value change to : ', newValue)
        return newValue
      }
    },
    base,
    {
      config: {
        component: base.component,
        ...config
      }
    }
  )
  delete prop.component
  return prop
}

Props.DS = DS
Props.genStyles = genStyles
Props.genDefaults = genDefaults
Props.genVueProps = genVueProps
Props.merge = merge
Props.Prop = Prop

export default Props
