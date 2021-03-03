import Vue from 'vue'

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
  this.data = Vue.observable({})

  /* 和 Vue 实例相关的属性 */
  this.$instance = null
  this.component = component
  this.props = Vue.observable(this.initProps())
  Object.entries(this.props).map(([k, v]) => (this.data[k] = v))
  this.propsConfig = Module.propsMap[this.name]
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
  this.data[key] = value
  // console.log('this.props: ', this.props)
}

/**
 * 递归收集组件的依赖数据（Props）
 * @param {string} name Vue组件名称
 * @param {VueComponent} component Vue组件（非实例）
 */
Module.propsMap = {}
Module.gatherProps = function(name, component) {
  function getComponentAndChildrenProps(cmpt) {
    const cmpts = cmpt.components || {}
    return Object.entries(cmpts).reduce((h, [, v]) => {
      h = {
        ...h,
        ...(v.props || {}),
        ...(cmpts.components
          ? getComponentAndChildrenProps(cmpts.components)
          : {}),
      }
      return h
    }, {...(cmpt.props || {})})
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
