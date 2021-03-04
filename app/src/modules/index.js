import clone from 'lodash.clonedeep'

import Text from './text/index'
import TestDynamicForm from './test-dynamic-form/index'

export default {
  getDefaultModuleList() {
    return clone([
      {
        title: '文本组件',
        description: '非常简单的文本组件',
        name: Text.name,
        component: Text,
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
