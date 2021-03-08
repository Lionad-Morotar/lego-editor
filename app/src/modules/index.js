import clone from 'lodash.clonedeep'

import Example from './example/index'
import BaseText from './base-text/index'
import BaseImage from './base-image/index'
import Compare from './compare/index'

export default {
  getDefaultModuleList () {
    const baseModuleList = [
      {
        title: '基础文本',
        description: '非常简单的文本组件',
        name: BaseText.name,
        component: BaseText,
        cover: ''
      },
      {
        title: '基础图片',
        description: '非常简单的图片组件',
        name: BaseImage.name,
        component: BaseImage,
        cover: ''
      }
    ]
    const composedModuleList = [
      {
        title: '对比组件',
        description: '简单的对比组件',
        name: Compare.name,
        component: Compare,
        cover: ''
      }
    ]
    const exampleModuleList = [
      {
        title: '测试组件',
        description: '供开发时参考及落文档用',
        name: Example.name,
        component: Example,
        cover: ''
      }
    ]
    return clone(
      [].concat(baseModuleList)
        .concat(composedModuleList)
        .concat(exampleModuleList)
    )
  }
}
