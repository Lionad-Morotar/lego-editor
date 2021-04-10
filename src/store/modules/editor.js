import { ModuleTypeEnums } from '@/constant'
import utils from '@/utils'
import { installEditableElement, installElement } from '@/segments/element'

const state = {
  // 已注册的模块，用于左侧面板展示、点击选择或拖拽用
  // todo rename
  modules: [],
  templates: [],
  // 已注册模块的原始信息的缓存，用于切换预览和编辑状态时重新注册模块等场景
  moduleSets: new Set(),
  selectedModuleCategory: null,
  selectedTemplateCategory: null,
  isPreview: false
}

/**
 * * ***************************************
 * MUTATIONS - M U T A T I O N S - MUTATIONS
 * * ***************************************
 */

const mutations = {
  ADD_MODULE (state, { module, inits }) {
    state.modules.push(module)
    state.moduleSets.add(inits)
  },
  ADD_TEMPLATE (state, template) {
    state.templates.push(template)
  },
  CLEAR_MODULE (state) {
    state.modules = []
  },
  SELECT_MODULE_CATEGORY (state, value) {
    state.selectedModuleCategory = value
  },
  UNSELECT_MODULE_CATEGORY (state) {
    state.selectedModuleCategory = null
  },
  SELECT_TEMPLATE_CATEGORY (state, value) {
    state.selectedTemplateCategory = value
  },
  UNSELECT_TEMPLATE_CATEGORY (state) {
    state.selectedTemplateCategory = null
  },
  TOGGLE_PREVIEW (state, value) {
    state.isPreview = value
  }
}

/**
 * * *******************************
 * GETTERS - G E T T E R S - GETTERS
 * * *******************************
 */

const getters = {

  /* 模块分类 */

  // 基础模块
  basementModules: state => state.modules.filter(x => x.categories.includes(ModuleTypeEnums.BASE)),
  // 营销模块
  composedModules: (_, getters) => state.modules.filter(x => !getters.basementModules.includes(x)),
  // 基础模块的分类
  // todo order
  basementModulesCategories: (_, getters) => {
    const allCates = getters.basementModules.reduce((h, c) => h.concat(c.categories), [])
    const catesSet = new Set(allCates)
    catesSet.delete(ModuleTypeEnums.BASE)
    return [...catesSet]
  },
  // 复合模块的分类
  composedModulesCategories: (_, getters) => {
    const allCates = getters.composedModules.reduce((h, c) => h.concat(c.categories), [])
    return [...new Set(allCates)]
  },
  // 所有模块的分类
  modulesCategories: (_, getters) => [].concat(getters.basementModulesCategories).concat(getters.composedModulesCategories),
  // 根据分类获得对应的模块
  getModulesByCategories: state => (cate = []) => {
    const cates = cate instanceof Array ? cate : [cate]
    return state.modules.filter(x => x.categories.some(y => cates.includes(y)))
  },
  // 当前选中的分类的模块
  selectedModulesByCategories: (state, getters) => getters.getModulesByCategories(state.selectedModuleCategory),

  /* 模板分类 */

  // 所有模板的分类
  templatesCategories: state => {
    const allCates = state.templates.reduce((h, c) => h.concat(c.categories), [])
    const catesSet = new Set(allCates)
    return [...catesSet]
  },
  // 根据分类获得对应的模板
  getTemplatesByCategories: state => (cate = []) => {
    const cates = cate instanceof Array ? cate : [cate]
    return state.templates.filter(x => x.categories.some(y => cates.includes(y)))
  },
  // 当前选中的分类的模板
  selectedTemplatesByCategories: (state, getters) => getters.getTemplatesByCategories(state.selectedTemplateCategory)
}

/**
 * * ***************************************
 * ACTIONS - A C T I O N S - ACTIONS
 * * ***************************************
 */

const actions = {
  CLEAR_MODULE ({ commit }) {
    commit('CLEAR_MODULE')
  },
  REINSTALL_MODULES ({ commit, state, dispatch }, isPreview) {
    commit('CLEAR_MODULE')
    dispatch('INSTALL_MODULES', {
      modules: [...state.moduleSets],
      isPreview
    })
  },
  INSTALL_MODULES ({ commit }, { modules, isPreview = false }) {
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
    installs(modules)
  },
  TOGGLE_PREVIEW ({ commit, state, dispatch }) {
    const nextPreviewState = !state.isPreview
    dispatch('REINSTALL_MODULES', nextPreviewState)
    commit('TOGGLE_PREVIEW', nextPreviewState)
  },
  SELECT_MODULE_CATEGORY ({ commit }, value) {
    commit('SELECT_MODULE_CATEGORY', value)
  },
  SELECT_TEMPLATE_CATEGORY ({ commit }, value) {
    commit('SELECT_TEMPLATE_CATEGORY', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
