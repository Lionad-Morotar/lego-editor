import Vue from 'vue'
import _ from 'lodash'
import Module from '@/models/module'
import Props from 'wox-props'
import ScreenElement from './index.vue'

/**
 * Element 提供了安装模块的方法，包含了应如何渲染模块的逻辑
 * 当前有两种模式：
 * 1. 预览模式
 * 2. 编辑模式
 */

export const installElement = (newModule, config = {}) => {
  const newModuleCopy = _.cloneDeep(newModule)
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
      const copy = _.cloneDeep(v)
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
          isRoot: true,
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
export const installPreviewElement = newModule => installElement(newModule, {
  gatherProps: true,
  standardizeProp: false,
  outline: true,
  captureClick: true
})
