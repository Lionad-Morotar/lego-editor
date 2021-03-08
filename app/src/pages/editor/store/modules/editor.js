import Vue from 'vue'
import Module from '../../models/module'
import ScreenElement from '../../segments/screen/element'

const state = {
  // 已注册的模块，用于左侧面板展示、选择或拖拽用
  modules: [],
  isPreview: false,
}

const mutations = {
  ADD_MODULE(state, newModule) {
    state.modules.push(newModule)
  },
  CLEAR_MODULE(state) {
    state.modules = []
  },
  TOGGLE_ISPREVIEW(state, value) {
    state.isPreview = value
  },
}

const getters = {}

const actions = {
  CLEAR_MODULE({ commit }) {
    commit('CLEAR_MODULE')
  },
  // 解耦“install”以及“preInstall”？
  INSTALL_MODULES({ commit }, { moduleList = [], editable = true }) {
    moduleList.map(newModule => {
      const isValidModule = m => !!m
      if (isValidModule(newModule)) {
        if (!editable) {
          Vue.component(newModule.name, newModule.component)
        } else {
          // 收集外部数据依赖
          Module.gatherProps(newModule.name, newModule.component)
          // 包装子模块
          const hasComponents = newModule.component.components
          if (hasComponents) {
            newModule.component.components = Object.entries(
              hasComponents,
            ).reduce((h, [k, v]) => {
              h[k] = {
                render(h) {
                  return h(ScreenElement, {
                    attrs: {
                      ...this.$attrs,
                    },
                    props: {
                      component: v,
                      captureClick: true,
                    },
                  })
                },
              }
              return h
            }, {})
          }
          // 包装模块以及注册
          Vue.component(newModule.name, {
            render(h) {
              // console.log(this.$attrs)
              return h(ScreenElement, {
                attrs: {
                  ...this.$attrs,
                },
                props: {
                  component: newModule.component,
                },
              })
            },
          })
        }
        commit('ADD_MODULE', newModule)
      }
    })
  },
  TOGGLE_ISPREVIEW({ commit, state }) {
    commit('TOGGLE_ISPREVIEW', !state.isPreview)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
