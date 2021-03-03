// TODO doc

/**
 * Module 用来承接模块的公用方法和属性，如 uuid、校验函数等
 * 约定，由 Module 生成的实例叫做模块实例
 * ***
 * props  模块依赖的外部值（也就是 Vue 组件的 props）
 * data   模块状态，由 props 清洗校验后得到，能与数据库交互
 */
export default function Module(inits) {
  const { title, description, name, component } = inits

  /* 模块属性 */
  this.uuid = String(+new Date()) + '_' + String(Math.random()).slice(-6)
  this.initialValue = inits
  this.name = name
  this.title = title
  this.description = description
  this.data = {}

  /* 和 Vue 实例相关的属性 */
  this.$instance = null
  this.$outlines = []
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
Module.prototype.setProp = function(key, value) {
  this.props[key] = value
  // todo wash before set data
  // this.data[key] = value
  // console.log('this.props: ', this.props)
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
    return Object.entries(cmpts).reduce(
      (h, [, v]) => {
        h = {
          ...h,
          ...(v.props || {}),
          ...(cmpts.components
            ? getComponentAndChildrenProps(cmpts.components)
            : {}),
        }
        return h
      },
      { ...(cmpt.props || {}) },
    )
  }
  const res = getComponentAndChildrenProps(component)
  Module.propsMap[name] = res
  return Module.propsMap[name]
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
