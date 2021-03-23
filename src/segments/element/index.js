import Vue from 'vue'
import clone from 'lodash.clonedeep'
import Module from '@/models/module'
import Props from '@/models/props'
import ScreenElement from './index.vue'

/**
 * 安装模块
 */
export const installElement = (newModule, config = {}) => {
  const newModuleCopy = clone(newModule)
  const {
    // 是否要收集模块的依赖
    gatherProps = false,
    // 是否需要把 Props 规范（@/models/props.js）转换成 Vue Props 规范
    standardizeProp = true,
    // 是否包裹一层高亮选框
    outline = false,
    // 是否捕获点击以阻止传播
    captureClick = false
  } = config

  if (gatherProps) {
    Module.gatherProps(newModuleCopy.name, newModuleCopy.component)
  }

  /* 处理子组件（当前约定只有单层的父子关系） */

  const hasComponents = newModuleCopy.component.components
  if (hasComponents) {
    newModuleCopy.component.components = Object.entries(
      hasComponents
    ).reduce((h, [k, v]) => {
      const copy = clone(v)
      if (standardizeProp) {
        copy.props = Props.genVueProps(copy.props)
      }
      h[k] = {
        render (h) {
          return h(ScreenElement, {
            props: {
              pass: { ...this.$attrs },
              component: copy,
              captureClick,
              outline,
              extras: copy.inline ? { class: 'inline' } : {}
            }
          })
        }
      }
      return h
    }, {})
  }

  /* 处理父组件 */

  if (standardizeProp) {
    newModuleCopy.component.props = Props.genVueProps(newModuleCopy.component.props)
  }
  Vue.component(newModuleCopy.name, {
    render (h) {
      return h(ScreenElement, {
        props: {
          component: newModuleCopy.component,
          captureClick,
          outline,
          extras: newModuleCopy.component.inline ? { class: 'inline' } : {}
        }
      })
    }
  })

  return newModuleCopy
}

/**
 * 安装可编辑的模块
 * 即附加上高亮选框、放点击等功能
 */
export const installEditableElement = newModule => installElement(newModule, {
  gatherProps: true,
  standardizeProp: false,
  outline: true,
  captureClick: true
})
