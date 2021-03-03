import Module from '../models/module'

const state = {
  modules: [],
  selected: null,
  selectedElement: null,
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
  SELECT_ELEMENT(state, element) {
    state.selectedElement = element
  },
  UNSELECT_ELEMENT(state) {
    state.selectedElement = null
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
    commit('SELECT_ELEMENT', module.$elements[0])
  },
  DELETE_MODULE({ commit }, module) {
    commit('DELETE_MODULE', module)
  },
  UNSELECTED({ commit, state }) {
    if (state.selected) {
      commit('DELETE_SELECTED')
      commit('UNSELECT_ELEMENT')
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
  SELECT_ELEMENT({ commit, state }, target) {
    if (state.selectedElement !== target) {
      commit('SELECT_ELEMENT', target)
    }
  },
  DELETE_SELECTED_MODULE({ commit, state }) {
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
