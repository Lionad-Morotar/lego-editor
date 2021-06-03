/* eslint-disable */


import Vue from 'vue'
import VueCroppie from 'vue-croppie'
import Alioss from './plugins/alioss'

Vue.use(Alioss)
Vue.use(VueCroppie)

import String from './string'
import Stringarea from './stringarea'
import Number from './number'
import Slider from './slider'
import Switch from './switch'
import Text from './text'
import Textarea from './textarea'
import Image from './image'
import ImageCroper from './image-upload-with-croper'
import Layout from './layout'

/**
 * 约定
 * ***
 * 1.组件接受 value 作为默认值（需做好防空处理）
 * 2.组件可向外触发改变 props 或改变 style 两种事件，
 * 分别对应修改模块的依赖数据的值和样式，
 * @example
 * this.$emit('change', 'new value')
 * @todo ？？this.$emit('changeProps', { key: value })
 * @todo ？？this.$emit('changeStyles', { key: value })
 */

// todo restructure

const Forms = {
  String,
  Stringarea,
  Number,
  Slider,
  Switch,
  Text,
  Textarea,
  Image,
  ImageCroper,
  Layout
}

export default {
  ...Forms,
  install (Vue) {
    Vue.prototype.$forms = Forms
    Object.entries(Forms).forEach(([k, v]) => {
      Vue.component('Forms' + k, v)
    })
  }
}
