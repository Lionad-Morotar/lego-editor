import { ModuleTypeEnums } from '@/constant'
import utils from '@/utils'
import { installEditableElement, installElement } from '@/segments/element'

const state = {
  // 已注册的模块，用于左侧面板展示、点击选择或拖拽用
  // todo rename
  modules: [],
  // 已注册模块的原始信息的缓存，用于切换预览和编辑状态时重新注册模块等场景
  moduleSets: new Set(),
  // 选中的模块的分类
  selectedModuleCategory: null,
  isPreview: false
}

const mutations = {
  ADD_MODULE (state, { module, inits }) {
    state.modules.push(module)
    state.moduleSets.add(inits)
  },
  CLEAR_MODULE (state) {
    state.modules = []
  },
  TOGGLE_ISPREVIEW (state, value) {
    state.isPreview = value
  },
  SELECT_MODULE_CATEGORY (state, value) {
    state.selectedModuleCategory = value
  },
  UNSELECT_MODULE_CATEGORY (state) {
    state.selectedModuleCategory = null
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
  // 所有组件的分类
  categories: (_, getters) => [].concat(getters.basementCategories).concat(getters.composedCategories),
  // 根据分类获得对应的模块
  getModulesByCategories: state => (cate = []) => {
    const cates = cate instanceof Array ? cate : [cate]
    return state.modules.filter(x => x.categories.some(y => cates.includes(y)))
  },
  // 当前选中的分类的模块
  selectedModulesByCategories: (state, getters) => getters.getModulesByCategories(state.selectedModuleCategory)
}

const actions = {
  CLEAR_MODULE ({ commit }) {
    commit('CLEAR_MODULE')
  },
  REINSTALL_MODULES ({ commit, state, rootState, dispatch }, isPreview) {
    commit('CLEAR_MODULE')
    dispatch('INSTALL_MODULES', {
      modules: {
        moduleList: [...state.moduleSets]
      },
      isPreview
    })
  },
  INSTALL_MODULES ({ commit, state, getters }, { modules = {}, isPreview = false }) {
    const {
      exampleModuleList = [],
      moduleList = []
    } = modules

    // console.log('isPreview: ', isPreview)
    const install = isPreview ? installElement : installEditableElement
    const installs = mlist => mlist.map(newModule => {
      if (utils.validInitModuleData(newModule)) {
        const wrappedModule = install(newModule)
        commit('ADD_MODULE', {
          module: wrappedModule,
          inits: newModule
        })
      }
    })
    installs(moduleList)
    installs(exampleModuleList)

    // 默认选中第一个分类
    if (!state.selectedModuleCategory) {
      const firstCate = getters.categories[0]
      if (firstCate) {
        commit('SELECT_MODULE_CATEGORY', firstCate)
      }
    }
  },
  TOGGLE_ISPREVIEW ({ commit, state, dispatch }) {
    const nextPreviewState = !state.isPreview
    // FIXME reinstall 之后，选中示例模块的高亮框示例，右侧动态面板绑定的值失效的问题
    dispatch('REINSTALL_MODULES', nextPreviewState)
    commit('TOGGLE_ISPREVIEW', nextPreviewState)
  },
  SELECT_MODULE_CATEGORY ({ commit }, value) {
    commit('SELECT_MODULE_CATEGORY', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
