import Vue from 'vue'

import { ModuleTypeEnums } from '@/constant'
import utils from '../../utils'
import { preInstall } from '../../segments/screen/element/index'

const state = {
  // 已注册的模块，用于左侧面板展示、点击选择或拖拽用
  modules: [],
  isPreview: false
}

const mutations = {
  ADD_MODULE (state, newModule) {
    state.modules.push(newModule)
  },
  CLEAR_MODULE (state) {
    state.modules = []
  },
  TOGGLE_ISPREVIEW (state, value) {
    state.isPreview = value
  }
}

const getters = {
  // 基础组件
  basementModules: state => state.modules.filter(x => x.categories.includes(ModuleTypeEnums.BASE)),
  // 高级组件
  composedModules: (_, getters) => state.modules.filter(x => !getters.basementModules.includes(x)),
  // 基础组件的分类
  // todo order
  basementCategories: (_, getters) => {
    const allCates = getters.basementModules.reduce((h, c) => h.concat(c.categories), [])
    const catesSet = new Set(allCates)
    catesSet.delete(ModuleTypeEnums.BASE)
    return [...catesSet]
  },
  // 复合组件的分类
  composedCategories: (_, getters) => {
    const allCates = getters.composedModules.reduce((h, c) => h.concat(c.categories), [])
    return [...new Set(allCates)]
  },
  // 根据分类获得对应的模块
  getModulesByCategories: state => (cate = []) => {
    const cates = cate instanceof Array ? cate : [cate]
    return state.modules.filter(x => x.categories.some(y => cates.includes(y)))
  }
}

const actions = {
  CLEAR_MODULE ({ commit }) {
    commit('CLEAR_MODULE')
  },
  INSTALL_MODULES ({ commit, getters }, { modules = {}, isPreview = false }) {
    const {
      exampleModuleList = [],
      moduleList = []
    } = modules
    // todo isValidModule
    const install = !isPreview ? preInstall : m => {
      Vue.component(m.name, m.component)
      return m
    }
    const installs = mlist => mlist.map(newModule => {
      if (utils.isValidPreInstallModule(newModule)) {
        const wrappedModule = install(newModule)
        commit('ADD_MODULE', wrappedModule)
      }
    })
    installs(moduleList)
    installs(exampleModuleList)
  },
  TOGGLE_ISPREVIEW ({ commit, state }) {
    commit('TOGGLE_ISPREVIEW', !state.isPreview)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
