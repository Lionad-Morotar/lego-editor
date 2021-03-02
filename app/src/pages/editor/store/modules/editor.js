import Vue from 'vue'

const state = {
  // 已注册的模块，用于左侧面板展示、选择或拖拽用
  modules: [],
}

const mutations = {
  ADD_MODULE(state, newModule) {
    state.modules.push(newModule)
  },
}

const getters = {}

const actions = {
  INSTALL_MODULES({ commit }, moduleList = []) {
    moduleList.map(newModule => {
      const isValidModule = m => !!m // todo
      if (isValidModule(newModule)) {
        // todo doc
        Vue.component(newModule.name, newModule.component)
        commit('ADD_MODULE', newModule)
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
