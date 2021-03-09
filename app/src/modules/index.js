import clone from 'lodash.clonedeep'

import { ModuleTypeEnums } from '@/constant'
import Example from './example/index'
import BaseText from './base-text/index'
import BaseImage from './base-image/index'
import Compare from './compare/index'

// todo doc
// 如果约定有更改，需要同步修改 editor/utils/convention 中的约定校验函数

const baseType = ModuleTypeEnums.BASE

export default {
  getDefaultModuleList () {
    const moduleList = [
      {
        title: '基础文本',
        description: '非常简单的文本组件',
        name: BaseText.name,
        component: BaseText,
        cover: 'xxxx',
        categories: [baseType, '文字组件']
      },
      {
        title: '基础图片',
        description: '非常简单的图片组件',
        name: BaseImage.name,
        component: BaseImage,
        cover: 'xxxx',
        categories: [baseType, '图片组件']
      },
      {
        title: '对比组件',
        description: '简单的对比组件',
        name: Compare.name,
        component: Compare,
        cover: 'xxxx',
        categories: ['对比组件']
      }
    ]
    const exampleModuleList = [
      {
        title: '测试组件',
        description: '供开发时参考及落文档用',
        name: Example.name,
        component: Example,
        cover: 'xxxx',
        categories: [baseType, '测试示例']
      }
    ]
    return {
      exampleModuleList: clone(exampleModuleList),
      moduleList: clone(moduleList)
    }
  }
}
