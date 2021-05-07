<template>
  <div class="lego-space" :style="styles" />
</template>

<script>
import Props from '@/models/props'
import { pass, zip } from '@/modules/utils'
import Forms from '@/forms'
import Height from './panel/height'
export default {
  name: 'lego-space',
  resizable: true,
  props: {
    layout: Props.layout({
      component: zip(
        Height,
        pass(Forms.Layout, {
          use: ['bgColor']
        })
      ),
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
.lego-space {
  width: 100%;
}
</style>
