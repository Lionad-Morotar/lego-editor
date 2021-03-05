import clone from 'lodash.clonedeep'

import BaseText from './base-text/index'
import BaseImage from './base-image/index'
import TestDynamicForm from './test-dynamic-form/index'

export default {
  getDefaultModuleList() {
    return clone([
      {
        title: '基础文本',
        description: '非常简单的文本组件',
        name: BaseText.name,
        component: BaseText,
        cover: '模块在左侧面板展示时的图片地址',
      },
      {
        title: '基础图片',
        description: '非常简单的图片组件',
        name: BaseImage.name,
        component: BaseImage,
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
