import clone from 'lodash.clonedeep'

import { ModuleTypeEnums } from '@/constant'

/* 基础模块 */
import Slider from './slider'
import Space from './space'
import Header from './header'
import StringArea from './textarea'
import Image from './image'
import Button from './button'
/* 高级模块 */
import Compare from './compare'
import Procedure from './procedure'

// todo doc
// 如果约定有更改，需要同步修改 @/utils/convention 中的约定校验函数
// 当前没有考虑 SSR

const baseType = ModuleTypeEnums.BASE

/* 文本模块 */

const textModules = [
  {
    title: '标题文本',
    description: '标题文本',
    component: Header,
    name: Header.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-text.png',
    categories: [baseType, '文本模块']
  },
  {
    title: '基础文本',
    description: '基础文本区域',
    component: StringArea,
    name: StringArea.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-textarea.png',
    categories: [baseType, '文本模块']
  }
]

/* 图片模块 */

const imageModules = [
  {
    title: '轮播模块',
    description: '轮播图',
    component: Slider,
    name: Slider.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-slider.png',
    categories: [baseType, '图片模块']
  },
  {
    title: '图片模块',
    description: '基础图片模块',
    component: Image,
    name: Image.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-image.png',
    categories: [baseType, '图片模块']
  }
]

const moduleList = [
  /* 基础模块 */
  ...textModules,
  ...imageModules,
  {
    title: '按钮模块',
    description: '基础按钮模块',
    component: Button,
    name: Button.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-button.png',
    categories: [baseType, '按钮模块']
  },
  {
    title: '空白占位',
    description: '空白占位模块，可以用来填充自由布局模块的背景',
    component: Space,
    name: Space.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-space.png',
    categories: [baseType, '分隔模块']
  },
  /* 高级模块 */
  {
    title: '流程模块',
    description: '流程模块测试',
    component: Procedure,
    name: Procedure.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-procedure.png',
    categories: ['流程模块']
  },
  {
    title: '对比模块',
    description: '对比模块测试',
    component: Compare,
    name: Compare.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-compare.png',
    categories: ['对比模块']
  }
]

export default {
  install (Vue) {
    // ...
  },
  getDefaultModuleList () {
    return clone(moduleList)
  }
}
