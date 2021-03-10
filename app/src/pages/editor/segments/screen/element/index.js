import Vue from 'vue'
import Module from 'editor/models/module'
import Props from 'editor/forms/props'
import ScreenElement from './index.vue'
import SimpleScreenElement from './simple'

// 安装模块，附加上高亮选框、放点击等功能
export const installEditableElement = newModule => {
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

/**
 * 正常安装模块（正常渲染）
 * 需要把 Props 规范（editor/forms/props.js）转换成 Vue Props 规范
 */
export const installElement = newModule => {
  const hasComponents = newModule.component.components
  if (hasComponents) {
    newModule.component.components = Object.entries(
      hasComponents
    ).reduce((h, [k, v]) => {
      v.props = Props.genVueProps(v.props)
      h[k] = {
        render (h) {
          return h(SimpleScreenElement, {
            props: {
              component: v
            }
          })
        }
      }
      return h
    }, {})
  }
  newModule.component.props = Props.genVueProps(newModule.component.props)
  Vue.component(newModule.name, {
    render (h) {
      return h(SimpleScreenElement, {
        props: {
          component: newModule.component
        }
      })
    }
  })

  return newModule
}
