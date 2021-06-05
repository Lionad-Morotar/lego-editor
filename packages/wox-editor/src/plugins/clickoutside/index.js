/**
 * @file clickoutside from element-ui
 */

import Vue from 'vue'

let id = 0
let mousedown = null
const nodes = []
const ctx = '@@clickoutside'

if (!Vue.prototype.$isServer) {
  document.addEventListener('mousedown', e => (mousedown = e))
  document.addEventListener('mouseup', mouseup => {
    nodes.map(node => node[ctx].handleClick(mouseup, mousedown))
  })
}

function createHandleClick (el, binding, vnode) {
  return function (mouseup = {}, mousedown = {}) {
    if (!vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target
    ) {
      return
    }

    const { expression, value } = binding
    if (expression && value) {
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName] &&
      vnode.context[el[ctx].methodName]()
    }
  }
}

const clickoutsideDirective = {
  bind (el, binding, vnode) {
    el.classList.add('m-clickoutside')
    el[ctx] = {
      id: id++,
      handleClick: createHandleClick(el, binding, vnode),
      methodName: binding.expression
    }
    nodes.push(el)
  },
  update (el, binding, vnode) {
    el[ctx].handleClick = createHandleClick(el, binding, vnode)
    el[ctx].methodName = binding.expression
  },
  unbind (el) {
    const findIdx = nodes.findIndex(x => x[ctx].id === el[ctx].id)
    if (findIdx !== -1) {
      nodes.splice(findIdx, 1)
    }
    delete el[ctx]
  }
}

export default {
  install (Vue) {
    Vue.directive('clickoutside', clickoutsideDirective)
    if (!Vue.prototype.$isServer) {
      const $styles = document.createElement('style')
      // 覆盖掉 Element 的样式的简单方法
      $styles.innerHTML = '.m-clickoutside { z-index: 9999; }'
      document.querySelector('body').appendChild($styles)
    }
  }
}
