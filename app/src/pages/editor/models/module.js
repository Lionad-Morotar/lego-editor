/**
 * Module 用来承接模块的公用方法和属性
 * ***
 * @param uuid   模块的独一无二的 ID，就算两个模块类型相同也如此
 * @param title  模块名称
 * @param description  模块的描述
 * @param name   模块对应组件的名称
 * @param component  模块对应的组件（未编译）
 * @param $instance  已渲染的模块的组件实例
 * @param $outlines  已渲染的模块的高亮边框的实例
 * @param props  模块依赖的外部值，是模块的所有父子兄弟组件的依赖的值的集合
 * @param data   模块数据，由 props 清洗校验后得到，主要用于和数据库交互
 * @param propsConfig  模块的依赖的外部值对应的原始定义
 */
export default function Module(inits) {
  const { title, description, name, component } = inits

  /* 模块属性 */
  this.uuid = String(+new Date()) + '_' + String(Math.random()).slice(-6)
  this.title = title
  this.description = description
  this.data = {}
  
  /* 和 Vue 实例相关的属性 */
  this.$instance = null
  this.$outlines = []
  this.name = name
  this.component = component
  this.props = this.initProps()
  Object.entries(this.props).map(([k, v]) => (this.data[k] = v))
  this.propsConfig = Module.propsMap[this.name]
}

/**
 * 绑定 Vue 实例
 * @param {VueInstance} instance 模块的 Vue 实例
 */
Module.prototype.bindInstance = function(instance) {
  if (this.$instance && console?.warn) {
    console.warn('[WARN] bindInstance twice')
  }
  this.$instance = instance
}
/**
 * 保存模型实例和模型 uuid 的映射关系
 * @param {string} uuid
 */
Module.prototype.bindModel = function(uuid) {
  if (Module.modelsMap[uuid] && console?.warn) {
    console.warn('[WARN] bindInstance twice')
  }
  Module.modelsMap[uuid] = this
}
Module.modelsMap = {}
Module.getModel = uuid => Module.modelsMap[uuid]

/**
 * 当模块依赖的值发生了变化...
 * 这部分可以独立出来是为了反应“变化”正在进行，
 * 方便实现 redo undo 操作，
 * 后续可以交由 vuex 做
 * @param {string} key 变化键名
 * @param {any} value 变化的值
 */
Module.prototype.setProp = function(key, value) {
  this.props[key] = value
  /* 校验并将 props 更新到 data */
  const handler = this.propsConfig[key]
  const validate = handler?.config?.validator || (() => void 0)
  const error = validate(value)
  if (error) {
    this.propsConfig[key].error = error
    // ?? this.data[key] = null
  } else {
    this.propsConfig[key].error = ''
    this.data[key] = value
  }
}

/**
 * 递归收集组件的依赖数据（Props）
 * @param {string} name Vue组件名称
 * @param {VueComponent} component Vue组件
 */
Module.propsMap = {}
Module.gatherProps = function(name, component) {
  function getComponentAndChildrenProps(cmpt) {
    const cmpts = cmpt.components || {}
    const props = Object.entries(cmpts).reduce((h, [, v]) => {
      h = {
        ...h,
        ...(v.props || {}),
        ...(cmpts.components
          ? getComponentAndChildrenProps(cmpts.components)
          : {}),
      }
      return h
    }, cmpt.props || {})
    Object.keys(props).map(name => {
      const k = props[name]._valueKey
      // 依赖项校验失败的错误信息
      props[name].error = ''
      /* 获取依赖项的展示值（真实值可能是一个包含样式和文本值的对象） */
      props[name].getDisplayValue = value => (k ? value[k] : value)
      props[name].injectDisplayFallback = value => {
        const defaultVal = k ? props[name].default[k] : props[name].default
        return defaultVal
          ? Object.assign(value, {
              [k]: defaultVal,
            })
          : undefined
      }
    })
    return props
  }
  const res = getComponentAndChildrenProps(component)
  Module.propsMap[name] = res
  return res
}

/**
 * 初始化模块所依赖的值
 */
Module.prototype.initProps = function() {
  const name = this.component.name
  const propsConfig = Module.propsMap[name]
  return Object.entries(propsConfig).reduce((h, [k, v]) => {
    h[k] = v.default
    return h
  }, {})
}
