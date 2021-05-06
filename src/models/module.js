import Props from '@/models/props'
import Utils from '@/utils'
import isEqual from 'lodash.isequal'

/**
 * TYPE
 * 保存到数据库的数据格式定义
 * @todo doc
 * @todo implement
 * @example
 * {
 *  [`DATA_KEY`]: this.data,
 *  [`META_KEY`]: this.getMetaData()
 * }
 */
export const META_KEY = 'meta'
export const LAYOUT_KEY = 'layout'

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
export default function Module (inits, initialData = {}) {
  const { title, description, name, component } = inits
  // TODO refactor 初始化方法
  const { meta = {}, ...rest } = initialData
  const hasInitialData = !!meta.title || Object.keys(rest).length > 0

  // console.log('initialData: ', initialData)

  /* 模块属性 */
  this.inits = inits
  this.uuid = meta.uuid || String(+new Date()) + '_' + String(Math.random()).slice(-6)
  this.title = meta.title || title
  this.description = meta.description || description
  this.data = {}

  /* 和 Vue 实例相关的属性 */
  this.$instance = null
  this.$outlines = []
  this.name = meta.name || name
  this.component = meta.component || component
  this.props = Object.assign(this.initProps(), hasInitialData ? rest : {})
  this.propsConfig = Module.propsMap[this.name]

  /* 布局和渲染相关属性 */
  this.layout = this.props[LAYOUT_KEY]

  Module.instanceList.push(this)
}

/* 保存实例、保存实例与 uuid 的映射关系 */
Module.instanceList = []
Module.instanceMap = {}
Module.clearCache = () => {
  Module.instanceList.map(x => {
    delete x.$instance
    while (x.$outlines.length) x.$outlines.pop()
  })
  Module.instanceList = []
  Module.instanceMap = {}
}

// 通过 uuid 获取实例
Module.getModel = function (uuid) {
  const find = Module.instanceMap[uuid] ||
    Module.instanceList.find(x => String(x.uuid) === String(uuid))
  if (find) {
    return find
  } else {
    console.warn(`[WARN] model which binded uuid ${uuid} not found`)
  }
}

/**
 * 绑定 Vue 实例
 * @param {VueInstance} instance 模块的 Vue 实例
 */
Module.prototype.bindInstance = function (instance) {
  if (this.$instance) {
    console.warn && console.warn('[WARN] bindInstance twice')
  }
  this.$instance = instance
}
/**
 * 保存模型实例和模型 uuid 的映射关系
 * @param {string} uuid
 */
Module.prototype.bindModel = function (uuid) {
  if (Module.instanceMap[uuid] && console?.warn) {
    console.warn('[WARN] bindInstance twice')
  }
  Module.instanceMap[uuid] = this
}

/**
 * 当模块依赖的值发生了变化...
 * 这部分可以独立出来是为了反应“变化”正在进行，
 * 方便实现 redo undo 操作，
 * 后续可以交由 vuex 做
 * @param {string} key 变化键名
 * @param {any} value 变化的值
 */
Module.prototype.setProp = function (key, value) {
  // TODO refactor Vue.watch
  if (value instanceof Object) {
    Object.entries(value).map(([k, v]) => {
      if (this.props[key][k] !== v) {
        this.props[key][k] = v
      }
    })
  } else {
    this.props[key] = value
  }
  /* 校验并将 props 更新到 data */
  const handler = this.propsConfig[key]
  if (handler) {
    const validate = handler.config?.validator || (() => undefined)
    const error = validate(value, this.props)
    if (error) {
      handler.lastError = error
      // ?? this.data[key] = null
    } else {
      handler.lastError = ''
      const oldValue = this.data[key]
      const newValue = handler.genData(value, oldValue)
      if (!isEqual(newValue, oldValue)) {
        this.data[key] = newValue
      }
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
  function getValidProps (props, baseProps = {}) {
    return Object.entries(props || {}).reduce((h, [k, v]) => {
      const isPassValue = v.config?.pass
      if (Props.isProp(v)) {
        if (isPassValue) {
          h[k] = h[k] || baseProps[k] || v
        } else {
          h[k] = v
        }
      }
      return h
    }, baseProps)
  }
  function getComponentAndChildrenProps (cmpt, baseProps) {
    const cmpts = cmpt.components || {}
    return Object.entries(cmpts).reduce((h, [, v]) => {
      h = {
        ...h,
        ...getValidProps(v.props, h),
        ...(cmpts.components
          ? getComponentAndChildrenProps(cmpts.components)
          : {})
      }
      return h
    }, getValidProps(cmpt.props, baseProps))
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
  const injectedMetaProps = {
    [META_KEY]: this.getMetaData(),
    [LAYOUT_KEY]: Props.layout({}).default
  }
  const props = Object.entries(propsConfig).reduce((h, [k, v]) => {
    const isPassValue = v.config?.pass
    if (!isPassValue) {
      h[k] = Props.genDefaults(v)
    }
    return h
  }, injectedMetaProps)
  Object.entries(props).map(([k, v]) => (this.data[k] = v))
  return props
}

/***
 * 获取模块的元描述信息
 * 比如 title、name 应该和数据一起保存存放到数据库，就需要用到元信息
 */
Module.prototype.getMetaData = function () {
  return {
    uuid: this.uuid,
    title: this.title,
    description: this.description,
    name: this.name
  }
}

/**
 * 获取所有保存到数据库的数据
 * @todo 剔除默认值，减小保存体积
 * @todo 剔除 setter getter
 */
Module.prototype.genStore = function () {
  return {
    ...Utils.clonevalue(this.props),
    [META_KEY]: this.getMetaData()
  }
}

/* 克隆单个模块 */
Module.prototype.clone = function () {
  const clonedProps = this.genStore()
  delete clonedProps.meta.uuid
  return new Module(this.inits, { ...clonedProps })
}
