<template>
  <div class="m-icon" :style="styles">
    <span class="iconfont" :class="icon" />
  </div>
</template>

<script>
import Props from 'wox-props'
import Forms from 'wox-forms'
import { zip, pass } from '../utils'
import Size from './panel/size'
import FontSize from './panel/font-size'
import Icon from './panel/icon'
export default {
  name: 'm-icon',
  props: {
    icon: Props.string({
      component: Icon,
      label: '图标',
      default: 'icon-earth'
    }),
    layout: Props.layout({
      default: {
        width: 40,
        height: 40,
        radius: 0,
        bgColor: '#ecedee',
        color: '#555',
        fontSize: 20
      },
      component: zip(
        Size,
        FontSize,
        pass(Forms.Layout, {
          use: ['bgColor', 'radius']
        })
      )
    })
  },
  computed: {
    styles () {
      return Props.genStyles(this.layout, { removeTranslate: true })
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./icons/ant-design.css');
.m-icon {
  display: flex;
  justify-content: center;
  align-items: center;

  .iconfont {
    font-size: inherit;
  }
}
</style>
