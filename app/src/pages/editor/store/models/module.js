import Vue from 'vue'

// TODO doc

// todo utils ?
// const deepClone = m => m

/**
 * Module 用来承接模块的公用方法和属性，如 uuid、校验函数等
 */
export default function Module(inits) {
  const { title, description, name } = inits
  // todo uuid
  this.uuid = +new Date()
  this.initialValue = inits
  this.name = name
  this.title = title
  this.description = description
  this.$instance = null
  this.validator = null
  Vue.component(inits.name)
}

// 将组件实例（Vue 实例）保存下来 ...
Module.prototype.setInstance = function(instance) {
  if (this.$instance && console.warn) {
    console.warn('[WARN] setInstance twice')
  }
  this.$instance = instance
}

// 校验函数
// 校验（组件编辑时的校验、C端校验是两种东西）refactor wip
Module.prototype.validate = function() {
  const $validator = this.$instance.validate
  if (!$validator) {
    return true
  } else {
    let isValid
    try {
      $validator(errMsg => {
        if (errMsg) {
          alert(errMsg)
          throw new Error('校验错误' + errMsg)
        }
      })
      isValid = true
    } catch (error) {
      isValid = false
    }
    return isValid
  }
}

/** Life Circle 并不对应 Vue 中的生命周期，只是借用名字 */

Module.prototype.mounted = function() {}
Module.prototype.beforeDestroy = function() {}
Module.prototype.destroy = function() {}
