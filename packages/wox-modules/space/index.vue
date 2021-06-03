<template>
  <div class="m-space" :style="styles" />
</template>

<script>
import Props from 'wox-props'
import { pass } from '../utils'
import Forms from 'wox-forms'
export default {
  name: 'm-space',
  resizable: true,
  props: {
    layout: Props.layout({
      component: pass(Forms.Layout, {
        use: ['height', 'bgColor']
      }),
      default: {
        lockLayout: true,
        width: 375,
        height: 70
      }
    })
  },
  computed: {
    styles () {
      return Props.genStyles(this.layout)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-space {
  width: 100%;
}
</style>
