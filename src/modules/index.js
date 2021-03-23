import clone from 'lodash.clonedeep'

import { ModuleTypeEnums } from '@/constant'
/* 基础模块 */
import Example from './example'
import Text from './text'
import Textarea from './textarea'
import Image from './image'
import Button from './button'
/* 高级模块 */
import Compare from './compare'
import Procedure from './procedure'

// todo doc
// 如果约定有更改，需要同步修改 @/utils/convention 中的约定校验函数

const baseType = ModuleTypeEnums.BASE

export default {
  getDefaultModuleList () {
    const moduleList = [
      /* 基础模块 */
      {
        title: '单行文本',
        description: '基础单行文本模块，可以调节字体大小，颜色等样式',
        name: Text.name,
        component: Text,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-text.png',
        categories: [baseType, '基础布局']
      },
      {
        title: '文本区域',
        description: '基础文本区域',
        name: Textarea.name,
        component: Textarea,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-textarea.png',
        categories: [baseType, '基础布局']
      },
      {
        title: '图片模块',
        description: '基础图片模块',
        name: Image.name,
        component: Image,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/pic.png',
        categories: [baseType, '基础布局']
      },
      {
        title: '按钮模块',
        description: '基础按钮模块',
        name: Button.name,
        component: Button,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-button.png',
        categories: [baseType, '基础布局']
      },
      /* 高级模块 */
      {
        title: '流程模块',
        description: '流程模块测试',
        name: Procedure.name,
        component: Procedure,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-procedure.png',
        categories: ['流程模块']
      },
      {
        title: '对比模块',
        description: '对比模块测试',
        name: Compare.name,
        component: Compare,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-compare.png',
        categories: ['对比模块']
      }
    ]
    const exampleModuleList = [
      {
        title: '测试模块',
        description: '测试模块',
        name: Example.name,
        component: Example,
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-example.png',
        categories: [baseType, '测试示例']
      }
    ]
    return {
      exampleModuleList: clone(exampleModuleList),
      moduleList: clone(moduleList)
    }
  }
}
