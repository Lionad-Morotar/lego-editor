import clone from 'lodash.clonedeep'

import { ModuleTypeEnums } from '@/constant'

/* 基础模块 */
import Slider from './slider'
import Space from './space'
import String from './text'
import Stringarea from './textarea'
import Image from './image'
import Button from './button'
/* 高级模块 */
import Compare from './compare'
import Procedure from './procedure'

// todo doc
// 如果约定有更改，需要同步修改 @/utils/convention 中的约定校验函数
// 当前没有考虑 SSR

const baseType = ModuleTypeEnums.BASE

const moduleList = [
  /* 基础模块 */
  {
    title: '轮播模块',
    description: '轮播图',
    component: Slider,
    name: Slider.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-slider.png',
    categories: [baseType, '基础布局']
  },
  {
    title: '单行文本',
    description: '基础单行文本模块，可以调节字体大小，颜色等样式',
    component: String,
    name: String.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-text.png',
    categories: [baseType, '基础布局']
  },
  {
    title: '文本区域',
    description: '基础文本区域',
    component: Stringarea,
    name: Stringarea.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-textarea.png',
    categories: [baseType, '基础布局']
  },
  {
    title: '图片模块',
    description: '基础图片模块',
    component: Image,
    name: Image.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-image.png',
    categories: [baseType, '基础布局']
  },
  {
    title: '按钮模块',
    description: '基础按钮模块',
    component: Button,
    name: Button.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-button.png',
    categories: [baseType, '基础布局']
  },
  {
    title: '空白占位',
    description: '空白占位模块，可以用来填充自由布局模块的背景',
    component: Space,
    name: Space.name,
    cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-space.png',
    categories: [baseType, '基础布局']
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
