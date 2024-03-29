import Vue from 'vue'
import Element from 'element-ui'
import Color from 'tinycolor2'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import lodash from 'lodash'

import DefaultModule from 'wox-modules'
import Forms from 'wox-forms'
import DefaultTemplate from 'wox-templates'

import Fragment from '@/plugins/fragment'
import KeyboardListener from '@/plugins/keyboards'
import Gesture from '@/plugins/gesture'
import Clickoutside from '@/plugins/clickoutside'
import Editor from './index.vue'
import store from './store'
import utils from './utils'

import 'reset-css'
import 'element-ui/lib/theme-chalk/index.css'
import 'croppie/croppie.css'
import './styles/index.scss'

Vue.use(Forms)
Vue.use(Element)
Vue.use(Fragment)
Vue.use(KeyboardListener)
Vue.use(Gesture)
Vue.use(Clickoutside)

Vue.prototype._ = lodash
Vue.prototype.$utils = utils
Vue.prototype.$color = Color

Vue.prototype.$keymaps = {}
const rawKeyboardWatchFn = Vue.prototype.$keyboards.watch
Vue.prototype.$keyboards.watch = (key, des, cb) => {
  if (!cb) {
    cb = des
  } else {
    des.callback = cb
    Vue.prototype.$keymaps[key] = des
  }
  return rawKeyboardWatchFn(key, cb)
}

const LegoEditor = new Vue({
  name: 'm-editor',
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
    // 添加模板
    DefaultTemplate.getDefaultTemplateList()
      .map(template => this.ADD_TEMPLATE(template))
    // 安装模块
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

// 导出模块，方便引入或做成多入口
LegoEditor.install = function (Vue) {
  Vue.component(LegoEditor.name, LegoEditor)
}

export default LegoEditor
