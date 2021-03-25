import Vue from 'vue'
import { mapActions } from 'vuex'
import Element from 'element-ui'
import Fragment from 'vue-fragment'
import 'reset-css'
import 'element-ui/lib/theme-chalk/index.css'

import Editor from './index.vue'
import DefaultModule from '@/modules'
import store from './store'
import utils from './utils'
import KeyboardListener from '@/plugins/keyboards'
import './styles/index.scss'

Vue.use(Element)
Vue.prototype.$utils = utils
// ! https://github.com/Thunberg087/vue-fragment/issues/62
Vue.use(Fragment.Plugin)
Vue.use(KeyboardListener)

const LegoEditor = new Vue({
  name: 'lego-editor',
  store,
  methods: {
    ...mapActions('editor', ['INSTALL_MODULES'])
  },
  mounted () {
    this.INSTALL_MODULES({
      modules: DefaultModule.getDefaultModuleList()
    })
  },
  render () {
    return <Editor />
  }
}).$mount('#app')

// 导出模块，方面引入或做成多入口
LegoEditor.install = function (Vue) {
  Vue.component(LegoEditor.name, LegoEditor)
}

export default LegoEditor
