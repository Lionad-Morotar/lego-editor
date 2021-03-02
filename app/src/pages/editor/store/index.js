import Vue from 'vue'
import Vuex from 'vuex'
import editor from './modules/editor'
import screen from './modules/screen'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    // 保存编辑器的基本信息，如面板宽高，模块信息
    editor,
    // 保存编辑的模板数据
    screen,
    // 保存用户信息
    user,
  },
})
