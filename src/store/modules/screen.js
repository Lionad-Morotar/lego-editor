import Module from '../../models/module'

const state = {
  modules: [],
  selected: null,
  selectedOutline: null
}

const mutations = {
  ADD_MODULE (state, { instance, idx }) {
    state.modules.splice(idx, 0, instance)
  },
  UPDATE_MODULES (state, newList) {
    state.modules = newList
  },
  SELECT_MODULE (state, module) {
    state.selected = module
  },
  DELETE_MODULE (state, module) {
    if (state.selected === module) {
      state.selected = null
    }
    state.modules.splice(
      state.modules.findIndex(m => m === module),
      1
    )
  },
  DELETE_SELECTED (state) {
    state.selected = null
  },
  // 移动模块，order 正数向数组右侧，负数向数组左侧
  // 先删除这个元素，然后在指定位置新增这个元素
  MOVE_MODULE (state, { order, findTarget }) {
    const index = state.modules.findIndex(x => x === findTarget)
    const length = state.modules.length
    state.modules.splice(index, 1)
    state.modules.splice(
      Math.min(length, Math.max(0, index + order)),
      0,
      findTarget
    )
  },
  SELECT_OUTLINE (state, element) {
    state.selectedOutline = element
  },
  UNSELECT_OUTLINE (state) {
    state.selectedOutline = null
  }
}
const getters = {}

const actions = {
  ADD_MODULE ({ commit, state }, { inits, initialData = {}, index }) {
    const instance = new Module(inits, initialData)
    const idx = index == null ? state.modules.length : index
    commit('ADD_MODULE', { instance, idx })
  },
  UPDATE_MODULES ({ commit }, newList) {
    commit('UPDATE_MODULES', newList)
  },
  SELECT_MODULE ({ commit }, module) {
    commit('SELECT_MODULE', module)
    commit('SELECT_OUTLINE', module.$outlines[0])
  },
  DELETE_MODULE ({ commit }, module) {
    commit('DELETE_MODULE', module)
  },
  UNSELECTED ({ commit, state }) {
    if (state.selected) {
      commit('DELETE_SELECTED')
      commit('UNSELECT_OUTLINE')
    }
  },
  MOVE_MODULE ({ commit, state }, order, module) {
    const targetModule = module || state.selected
    const findTarget = state.modules.find(x => x === targetModule)
    if (findTarget && order) {
      commit('MOVE_MODULE', {
        order,
        findTarget
      })
    }
  },
  SELECT_OUTLINE ({ commit, state }, target) {
    if (state.selectedOutline !== target) {
      commit('SELECT_OUTLINE', target)
    }
  },
  DELETE_SELECTED_MODULE ({ commit, state }) {
    if (state.selected) {
      commit('DELETE_MODULE', state.selected)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
