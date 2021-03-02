import Module from '../models/module'

const state = {
  // page ?
  modules: [],
  selected: null,
}

const mutations = {
  ADD_MODULE(state, module) {
    state.modules.push(module)
  },
  SELECT_MODULE(state, module) {
    state.selected = module
  },
  DELETE_MODULE(state, module) {
    if (state.selected === module) {
      state.selected = null
    }
    state.modules.splice(
      state.modules.findIndex(m => m === module),
      1,
    )
  },
  DELETE_SELECTED(state) {
    state.selected = null
  },
  MOVE_MODULE(state, { order, findTarget }) {
    const index = state.modules.findIndex(x => x === findTarget)
    const length = state.modules.length
    state.modules.splice(index, 1)
    state.modules.splice(
      Math.min(length, Math.max(0, index + order)),
      0,
      findTarget,
    )
  },
}

const getters = {}

const actions = {
  ADD_MODULE({ commit }, inits) {
    const instance = new Module(inits)
    commit('ADD_MODULE', instance)
  },
  SELECT_MODULE({ commit }, module) {
    commit('SELECT_MODULE', module)
  },
  DELETE_MODULE({ commit }, module) {
    commit('DELETE_MODULE', module)
  },
  UNSELECTED({ commit, state }) {
    if (state.selected) {
      commit('DELETE_SELECTED')
    }
  },
  // 移动模块，order 正数向数组右侧，负数向数组左侧
  MOVE_MODULE({ commit, state }, order, module) {
    const targetModule = module || state.selected
    const findTarget = state.modules.find(x => x === targetModule)
    if (findTarget && order) {
      commit('MOVE_MODULE', {
        order,
        findTarget,
      })
    }
  },

  /* 以下 Action 不对应有 Mutation */

  DELETE_SELETED_MODULE({ commit, state }) {
    if (state.selected) {
      commit('DELETE_MODULE', state.selected)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}