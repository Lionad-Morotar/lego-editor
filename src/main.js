import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Element from 'element-ui'
import Fragment from 'vue-fragment'
import 'reset-css'
import 'element-ui/lib/theme-chalk/index.css'

import Editor from './index.vue'
import DefaultTemplate from '@/templates'
import DefaultModule from '@/modules'
import store from './store'
import utils from './utils'
import KeyboardListener from '@/plugins/keyboards'
import Gesture from '@/plugins/gesture'
import './styles/index.scss'

Vue.use(Element)
Vue.prototype.$utils = utils
// ! https://github.com/Thunberg087/vue-fragment/issues/62
Vue.use(Fragment.Plugin)
Vue.use(KeyboardListener)
Vue.use(Gesture)

const LegoEditor = new Vue({
  name: 'lego-editor',
  store,
  computed: {
    ...mapGetters('editor', [
      'modulesCategories',
      'templatesCategories'
    ])
  },
  methods: {
    ...mapMutations('editor', [
      'ADD_TEMPLATE'
    ]),
    ...mapActions('editor', [
      'INSTALL_MODULES',
      'SELECT_MODULE_CATEGORY',
      'SELECT_TEMPLATE_CATEGORY'
    ])
  },
  mounted () {
    /* 添加模板 & 安装模块 */
    DefaultTemplate.getDefaultTemplateList().map(template => this.ADD_TEMPLATE(template))
    this.INSTALL_MODULES({
      modules: DefaultModule.getDefaultModuleList()
    })
    /* 默认选中左侧面板的第一个菜单项 */
    this.$nextTick(() => {
      const firstModuleCate = this.modulesCategories[0]
      firstModuleCate && this.SELECT_MODULE_CATEGORY(firstModuleCate)
      const firstTemplateCate = this.templatesCategories[0]
      firstTemplateCate && this.SELECT_TEMPLATE_CATEGORY(firstTemplateCate)
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
