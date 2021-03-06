import Vue from 'vue'
import Module from '@/models/module'
import Utils from '@/utils'

const state = {
  // 记录是否正在拖拽模块
  moving: false,
  modules: [],
  drafts: [],
  draftOffset: 0,
  maxDragsLen: 50,
  selected: null,
  selectedOutline: null,
  // 记录某个模块连续复制了几次（以计算复制后的模块在Y轴方向上的偏移）
  cloneCombo: 0
}

/**
 * * ***************************************
 * MUTATIONS - M U T A T I O N S - MUTATIONS
 * * ***************************************
 */

const mutations = {
  SET_MOVING (state, newVal) {
    state.moving = newVal
  },
  ADD_MODULE (state, { newModule, idx }) {
    state.modules.splice(idx, 0, newModule)
  },
  UPDATE_MODULES (state, newList) {
    state.modules = newList
  },
  CLEAR_DRAFTS (state) {
    state.drafts = []
  },
  CLEAR_DRAFTS_OFFSET (state) {
    state.draftOffset = 0
  },
  ADD_DRAFT (state, { newDraft, idx }) {
    state.drafts.splice(idx, 0, newDraft)
  },
  APPLY_DRAFTS (state, newDrafts) {
    state.drafts = newDrafts
  },
  CLEAR_MODULES (state) {
    state.modules = []
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

/**
 * * *******************************
 * GETTERS - G E T T E R S - GETTERS
 * * *******************************
 */

const getters = {
  isSelectedTopOutline: state =>
    state.selected &&
    state.selected.$outlines &&
    state.selected.$outlines[0] === state.selectedOutline,
  lastDraft: state => state.drafts.length
    ? state.drafts[state.drafts.length - 1]
    : null
}

/**
 * * ***************************************
 * ACTIONS - A C T I O N S - ACTIONS
 * * ***************************************
 */

const actions = {
  ADD_MODULE ({ commit, state }, { inits, initialData = {}, index }) {
    if (inits) {
      const curLen = state.modules.length
      if (curLen >= 15) {
        alert('当前测试版本只支持最多 15 个组件')
      } else {
        const newModule = new Module(inits, initialData)
        const idx = index == null ? curLen : index
        commit('ADD_MODULE', { newModule, idx })
      }
    } else {
      console?.warn && console.warn('[ERR] no modules when ADD_MODULE in screen store')
    }
  },
  UPDATE_MODULES ({ commit }, newList) {
    commit('UPDATE_MODULES', newList)
  },
  // TODO rename to clearCache
  CLEAR_SCREEN ({ commit, dispatch }) {
    dispatch('UNSELECTED')
    commit('CLEAR_MODULES')
    Module.clearCache()
  },
  SELECT_MODULE ({ commit, state }, module) {
    state.cloneCombo = 0
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
  CLONE_MODULE ({ commit, state }, module) {
    const targetModule = module || state.selected
    const cloned = targetModule.clone()
    if (!cloned.props.layout.auto) {
      cloned.props.layout.top += (++state.cloneCombo * cloned.props.layout.height)
    }
    const targetIDX = state.modules.findIndex(x => x === targetModule)
    commit('ADD_MODULE', {
      instance: cloned,
      idx: targetIDX + 1
    })
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
  },
  CLEAR_DRAFTS ({ commit }) {
    commit('CLEAR_DRAFTS_OFFSET')
    commit('CLEAR_DRAFTS')
  },
  ADD_DRAFT ({ state, commit }, datas) {
    datas = datas || state.modules.map(x => x.genStore())

    // 添加新的草稿时需要清空用于重做的草稿项
    if (state.draftOffset) {
      commit('APPLY_DRAFTS', state.drafts.slice(0, -state.draftOffset))
    }

    commit('CLEAR_DRAFTS_OFFSET')
    const idx = state.drafts.length
    const newDraft = Utils.clonevalue(datas)
    commit('ADD_DRAFT', { newDraft, idx })
  },
  APPLY_DRAFT ({ state, dispatch, rootState }) {
    const datas = state.drafts[state.drafts.length - state.draftOffset - 1]
    if (datas) {
      dispatch('CLEAR_SCREEN')
      Vue.nextTick(() => {
        datas.forEach((x, idx) => {
          const target = rootState.editor.modules.find(y => y.name === x.meta.name)
          if (target) {
            datas[idx].meta.component = target.component
            dispatch('ADD_MODULE', {
              inits: target,
              initialData: x
            })
          }
        })
      })
    } else {
      console.warn('[WARN] no draft to apply to')
    }
  },
  UNDO ({ state, dispatch }) {
    if (state.draftOffset < state.drafts.length) {
      state.draftOffset += 1
      dispatch('APPLY_DRAFT')
    }
  },
  REDO ({ state, dispatch }) {
    if (state.draftOffset >= 1) {
      state.draftOffset -= 1
      dispatch('APPLY_DRAFT')
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
