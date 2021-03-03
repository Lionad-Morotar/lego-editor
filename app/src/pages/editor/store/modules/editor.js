import Vue from 'vue'
import Outline from '../../segments/screen/element/outline'
import ClickCapture from '../../segments/screen/element/click-capture'

import Module from '../models/module'

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
  INSTALL_MODULES({ commit }, { moduleList = [], editable = true }) {
    moduleList.map(newModule => {
      // todo
      const isValidModule = m => !!m
      if (isValidModule(newModule)) {
        if (!editable) {
          Vue.component(newModule.name, newModule.component)
        } else {
          Module.gatherProps(newModule.name, newModule.component)
          // 将子组件用 Outline 包裹使其支持选中高亮
          newModule.component.components = Object.entries(
            newModule.component.components || {},
          ).reduce((h, [k, v]) => {
            h[k] = {
              render(h) {
                return h(
                  Outline,
                  {
                    props: {
                      props: v.props,
                    },
                  },
                  [h(ClickCapture, {}, [h(v)])],
                )
              },
            }
            return h
          }, {})
          Vue.component(newModule.name, {
            render(h) {
              return h(
                Outline,
                {
                  props: {
                    props: newModule.component.props,
                  },
                },
                [h(newModule.component)],
              )
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
