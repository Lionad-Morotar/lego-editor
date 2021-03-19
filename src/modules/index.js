import clone from 'lodash.clonedeep'

import { ModuleTypeEnums } from '@/constant'
import Example from './example'
import BaseText from './base-text'
import BaseImage from './base-image'
import Compare from './compare'
import Procedure from './procedure'

// todo doc
// 如果约定有更改，需要同步修改 @/utils/convention 中的约定校验函数

const baseType = ModuleTypeEnums.BASE

export default {
  getDefaultModuleList () {
    const moduleList = [
      {
        title: '基础文本',
        description: '基础文本测试',
        name: BaseText.name,
        component: BaseText,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/pic.png',
        categories: [baseType, '文字模块']
      },
      /* 勿删 用来测试拖拽的组件 Start */
      {
        title: '基础文本-1',
        description: '基础文本测试-1',
        name: 'test-1',
        component: BaseText,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/pic.png',
        categories: [baseType, '文字模块']
      },
      {
        title: '基础图片-2',
        description: '基础图片测试-2',
        name: 'test-2',
        component: BaseImage,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/pic.png',
        categories: [baseType, '文字模块']
      },
      {
        title: '基础文本-3',
        description: '基础文本测试-3',
        name: 'test-3',
        component: BaseText,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/pic.png',
        categories: [baseType, '文字模块']
      },
      {
        title: '基础图片-4',
        description: '基础图片测试-4',
        name: 'test-4',
        component: BaseImage,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/pic.png',
        categories: [baseType, '文字模块']
      },
      /* 勿删 用来测试拖拽的组件 End */
      {
        title: '基础图片',
        description: '基础图片测试',
        name: BaseImage.name,
        component: BaseImage,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/pic.png',
        categories: [baseType, '图片模块']
      },
      {
        title: '流程模块',
        description: '流程模块测试',
        name: Procedure.name,
        component: Procedure,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/procedure-1.png',
        categories: ['流程模块']
      },
      {
        title: '对比模块',
        description: '对比模块测试',
        name: Compare.name,
        component: Compare,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/pic.png',
        categories: ['对比模块']
      }
    ]
    const exampleModuleList = [
      {
        title: '测试模块',
        description: '测试模块',
        name: Example.name,
        component: Example,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/pic.png',
        categories: [baseType, '测试示例']
      }
    ]
    return {
      exampleModuleList: clone(exampleModuleList),
      moduleList: clone(moduleList)
    }
  }
}
