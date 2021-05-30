/* Automatically generated by './build/bin/modules-entry.js' */

/* eslint-disable */

import clone from 'lodash.clonedeep'

import Header from './header'
import Textarea from './textarea'
import Image from './image'
import Slider from './slider'
import Button from './button'
import Space from './space'
import Procedure from './procedure'
import Compare from './compare'

export default {
  getDefaultModuleList () {
    return clone([{
      "title": "标题文本",
      "description": "标题文本",
      "cover": "https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-text.png",
      "categories": [
        "基础模块",
        "文本模块"
      ],
      "component": Header,
      "name": "lego-header"
    },
    {
      "title": "基础文本",
      "description": "基础文本",
      "cover": "https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-textarea.png",
      "categories": [
        "基础模块",
        "文本模块"
      ],
      "component": Textarea,
      "name": "lego-textarea"
    },
    {
      "title": "图片模块",
      "description": "图片模块",
      "cover": "https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-image.png",
      "categories": [
        "基础模块",
        "图片模块"
      ],
      "component": Image,
      "name": "lego-image"
    },
    {
      "title": "轮播模块",
      "description": "轮播模块",
      "cover": "https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-slider.png",
      "categories": [
        "基础模块",
        "图片模块"
      ],
      "component": Slider,
      "name": "lego-slider"
    },
    {
      "title": "按钮模块",
      "description": "按钮模块",
      "cover": "https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-basic-button.png",
      "categories": [
        "基础模块",
        "按钮模块"
      ],
      "component": Button,
      "name": "lego-button"
    },
    {
      "title": "空白占位",
      "description": "空白占位模块，可以用来填充自由布局模块的背景",
      "cover": "https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-space.png",
      "categories": [
        "基础模块",
        "分隔模块"
      ],
      "component": Space,
      "name": "lego-space"
    },
    {
      "title": "流程模块",
      "description": "流程模块",
      "cover": "https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-procedure.png",
      "categories": [
        "流程模块"
      ],
      "component": Procedure,
      "name": "lego-procedure"
    },
    {
      "title": "对比模块",
      "description": "对比模块",
      "cover": "https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/preview-compare.png",
      "categories": [
        "对比模块"
      ],
      "component": Compare,
      "name": "lego-compare"
    }])
  }
}
