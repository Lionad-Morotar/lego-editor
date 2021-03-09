import Vue from 'vue'

import Module from '../../../models/module'
import ScreenElement from './index.vue'

// 预安装，包装模块，附加上高亮选框、放点击等功能
export const preInstall = newModule => {
  // 收集外部数据依赖
  Module.gatherProps(newModule.name, newModule.component)
  // 包装子模块
  const hasComponents = newModule.component.components
  if (hasComponents) {
    newModule.component.components = Object.entries(
      hasComponents
    ).reduce((h, [k, v]) => {
      h[k] = {
        render (h) {
          return h(ScreenElement, {
            attrs: {
              ...this.$attrs
            },
            props: {
              component: v,
              captureClick: true
            }
          })
        }
      }
      return h
    }, {})
  }
  // 包装模块以及注册
  Vue.component(newModule.name, {
    render (h) {
      // console.log(this.$attrs)
      return h(ScreenElement, {
        attrs: {
          ...this.$attrs
        },
        props: {
          component: newModule.component
        }
      })
    }
  })

  return newModule
}
