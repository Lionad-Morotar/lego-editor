// TODO refactor with webpack.resolver
import Props from '../segments/right-panel/quick-form/props'

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
export default function Module (inits) {
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
Module.prototype.bindInstance = function (instance) {
  if (this.$instance && console?.warn) {
    console.warn('[WARN] bindInstance twice')
  }
  this.$instance = instance
}
/**
 * 保存模型实例和模型 uuid 的映射关系
 * @param {string} uuid
 */
Module.prototype.bindModel = function (uuid) {
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
Module.prototype.setProp = function (key, value) {
  this.props[key] = value
  /* 校验并将 props 更新到 data */
  const handler = this.propsConfig[key]
  const validate = handler.config?.validator || (() => undefined)
  const error = validate(value, this.props)
  if (error) {
    handler.lastError = error
    // ?? this.data[key] = null
  } else {
    handler.lastError = ''
    const oldValue = this.data[key]
    const newValue = handler.genData(value, oldValue)
    if (newValue !== oldValue) {
      this.data[key] = newValue
    }
  }
}

/**
 * 递归收集组件的依赖数据（Props）
 * @param {string} name Vue组件名称
 * @param {VueComponent} component Vue组件
 */
Module.propsMap = {}
Module.gatherProps = function (name, component) {
  function getValidProps (props) {
    return Object.entries(props || {}).reduce((h, [k, v]) => {
      if (v instanceof Props.Prop) {
        h[k] = v
      }
      return h
    }, {})
  }
  function getComponentAndChildrenProps (cmpt) {
    const cmpts = cmpt.components || {}
    return Object.entries(cmpts).reduce((h, [, v]) => {
      h = {
        ...h,
        ...getValidProps(v.props),
        ...(cmpts.components
          ? getComponentAndChildrenProps(cmpts.components)
          : {})
      }
      return h
    }, getValidProps(cmpt.props))
  }
  const res = getComponentAndChildrenProps(component)
  Module.propsMap[name] = res
  return res
}

/**
 * 初始化模块所依赖的值
 */
Module.prototype.initProps = function () {
  const name = this.component.name
  const propsConfig = Module.propsMap[name]
  return Object.entries(propsConfig).reduce((h, [k, v]) => {
    h[k] = Props.genDefaults(v)
    return h
  }, {})
}
