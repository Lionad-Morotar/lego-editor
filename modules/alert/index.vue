<template>
  <div class="m-alert" :class="[ center ? 'is-center' : '' ]" v-if="visible" :style="styles" role="alert">
    <div class="m-alert__content">
      <span class="m-alert__title" :class="[ isBoldTitle ]" v-if="title">{{ title }}</span>
      <p class="m-alert__description" v-if="description">{{ description }}</p>
      <i class="m-alert__closebtn" :class="[ 'el-icon-close' ]" v-show="closable" @click="close()" />
    </div>
  </div>
</template>

<script>
import Props from '@/models/props'
import { pass } from 'modules/utils'
import Forms from '@/forms'
// TODO 没有 description 时，closebtn 和 title 同 line-height
export default {
  name: 'm-alert',
  props: {
    layout: Props.layout({
      default: {
        height: 56,
        padding: [8, 12, 8, 12],
        radius: 0
      },
      component: pass(Forms.Layout, {
        use: ['height', 'radius']
      })
    }),
    title: Props.string({
      label: '标题',
      default: '默认提示框'
    }),
    description: Props.string({
      label: '详细描述',
      default: '提示框可以带一行描述文本'
    }),
    closable: Props.bool({
      label: '关闭按钮',
      default: true
    }),
    center: Props.bool({
      label: '居中显示',
      default: false
    })
    // TODO control showTimes with localStorage
    // showTimes: Props.number(0)
  },
  computed: {
    styles () {
      return Props.genStyles(this.layout, { removeTranslate: true })
    },
    isBoldTitle () {
      return this.description ? 'is-bold' : ''
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    close () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../mixins";
@include b(alert) {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  width: 100%;
  color: #909399;
  background-color: mix(white, #909399, 83%);

  @include is(center) {
    justify-content: center;
  }

  @include e(title) {
    font-size: 13px;
    line-height: 18px;

    @include is(bold) {
      font-weight: bold;
    }
  }

  @include e(description) {
    font-size: 12px;
    margin: 5px 0 0 0;
  }

  @include e(closebtn) {
    font-size: 13px;
    position: absolute;
    top: 9px;
    right: 11px;
    cursor: pointer;
  }
}
</style>
