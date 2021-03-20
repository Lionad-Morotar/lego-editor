import clone from 'lodash.clonedeep'

import { ModuleTypeEnums } from '@/constant'
import Example from './example'
import BaseText from './base-text'
import BaseTextarea from './base-textarea'
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
        description: '文本组件，可以调节字体大小，颜色等样式',
        name: BaseText.name,
        component: BaseText,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-text.png',
        categories: [baseType, '文字模块']
      },
      {
        title: '文本区域',
        description: '文本区域，可看作可以换行的文本组件',
        name: BaseTextarea.name,
        component: BaseTextarea,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-textarea.png',
        categories: [baseType, '文字模块']
      },
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
