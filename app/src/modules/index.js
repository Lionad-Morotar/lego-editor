import clone from 'lodash.clonedeep'

import TestForm from './test-form/index'
import TestDynamicForm from './test-dynamic-form/index'

export default {
  getDefaultModuleList() {
    return clone([
      {
        title: '基础表单',
        description: '非常简单的测试表单',
        name: TestForm.name,
        component: TestForm,
        cover: '模块在左侧面板展示时的图片地址',
      },
      {
        title: '动态表单',
        description: '非常简单的动态表单',
        name: TestDynamicForm.name,
        component: TestDynamicForm,
        cover: '模块在左侧面板展示时的图片地址',
      },
    ])
  },
}
