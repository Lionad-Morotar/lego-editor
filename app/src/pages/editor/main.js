import Vue from 'vue'
import { mapActions } from 'vuex'
import Element from 'element-ui'
// import Fragment from 'vue-fragment' // todo
import 'reset-css'
import 'element-ui/lib/theme-chalk/index.css'

import Editor from './Editor.vue'
import DefaultModule from '@/modules'
import store from './store'
import './styles/index.scss'

Vue.use(Element)
// Vue.use(Fragment) // todo

const LegoEditor = new Vue({
  name: 'lego-editor',
  store,
  methods: {
    ...mapActions('editor', ['INSTALL_MODULES']),
  },
  mounted() {
    this.INSTALL_MODULES(DefaultModule.moduleList)
  },
  render() {
    return <Editor />
  },
}).$mount('#app')

// 导出模块，方面引入或做成多入口
LegoEditor.install = function(Vue) {
  Vue.component(LegoEditor.name, LegoEditor)
}

export default LegoEditor

