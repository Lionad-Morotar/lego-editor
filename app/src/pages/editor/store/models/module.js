// TODO doc

/**
 * Module 用来承接模块的公用方法和属性，如 uuid、校验函数等
 * 约定，由 Module 生成的实例叫做模块实例
 */
export default function Module(inits) {
  const { title, description, name, component } = inits

  /* 模块属性 */
  // todo uuid
  this.uuid = +new Date()
  this.initialValue = inits
  this.name = name
  this.title = title
  this.description = description

  /* 和 Vue 实例相关的属性 */
  this.component = component
  this.props = this.initProps()
  // 需不需要维护模块实例和 vue 实例的关系？
  this.$instance = null
}

/**
 * 保存模块的 Vue 实例
 * @param {VueInstance} instance 已渲染的组件的 vue 实例
 */
Module.prototype.setInstance = function(instance) {
  if (this.$instance && console.warn) {
    console.warn('[WARN] setInstance twice')
  }
  this.$instance = instance
}

// /**
//  * 当模块依赖的值发生了变化...
//  * 这部分可以独立出来是为了反应“变化”正在进行，
//  * 方便实现 redo undo 操作，
//  * 后续也许可以交由 vuex 做
//  * @param {string} key 变化键名
//  * @param {any} value 变化的值
//  */
Module.prototype.setProp = function(key, value) {
  this.props[key] = value
}

/**
 * 初始化模块所依赖的值
 */
Module.prototype.initProps = function() {
  return Object.entries(this.component.props || {}).reduce((h, [k, v]) => {
    h[k] = v.default
    return h
  }, {})
}

// refactor WIP
// 校验函数（组件编辑时的校验、C端校验是两种东西）
Module.prototype.validate = function() {
  // const $validator = this.$instance.validate
  // if (!$validator) {
  //   return true
  // } else {
  //   let isValid
  //   try {
  //     $validator(errMsg => {
  //       if (errMsg) {
  //         alert(errMsg)
  //         throw new Error('校验错误' + errMsg)
  //       }
  //     })
  //     isValid = true
  //   } catch (error) {
  //     isValid = false
  //   }
  //   return isValid
  // }
}

/** Life Circle 并不对应 Vue 中的生命周期，只是借用名字 */

Module.prototype.mounted = function() {}
Module.prototype.beforeDestroy = function() {}
Module.prototype.destroy = function() {}
