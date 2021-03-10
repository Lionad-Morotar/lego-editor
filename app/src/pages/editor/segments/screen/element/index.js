import Vue from 'vue'
import Module from 'editor/models/module'
import Props from 'editor/forms/props'
import ScreenElement from './index.vue'

/**
 * 安装模块
 */
export const installElement = (newModule, config = {}) => {
  const {
    // 是否要收集模块的依赖
    gatherProps = false,
    // 是否需要把 Props 规范（editor/forms/props.js）转换成 Vue Props 规范
    standardizeProp = true,
    // 是否包裹一层高亮选框
    outline = false,
    // 是否捕获点击以阻止传播
    captureClick = false
  } = config

  if (gatherProps) {
    Module.gatherProps(newModule.name, newModule.component)
  }

  /* 处理子组件（当前约定只有单层的父子关系） */

  const hasComponents = newModule.component.components
  if (hasComponents) {
    newModule.component.components = Object.entries(
      hasComponents
    ).reduce((h, [k, v]) => {
      if (standardizeProp) {
        v.props = Props.genVueProps(v.props)
      }
      h[k] = {
        render (h) {
          return h(ScreenElement, {
            props: {
              component: v,
              captureClick,
              outline
            }
          })
        }
      }
      return h
    }, {})
  }

  /* 处理父组件 */

  if (standardizeProp) {
    newModule.component.props = Props.genVueProps(newModule.component.props)
  }
  Vue.component(newModule.name, {
    render (h) {
      return h(ScreenElement, {
        props: {
          component: newModule.component,
          // todo refactor
          captureClick: false,
          outline
        }
      })
    }
  })

  return newModule
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
