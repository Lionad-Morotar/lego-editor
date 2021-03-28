<template>
  <el-carousel
    class="lego-slider"
    height="150px"
    arrow="never"
    :loop="loop"
    :autoplay="autoplay"
    :interval="interval"
    :style="moduleStyle">
    <el-carousel-item v-for="(image, idx) in images" :key="image.url+idx">
      <img class="lego-slider-item" :src="image.url" :style="styles[idx]" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import Props from '@/models/props'
import Forms from '@/forms'
import { pass } from '@/modules/utils'
import Panel from './panel/index'
import Loop from './panel/loop'
import AutoPlay from './panel/autoplay'
import AutoPlayInterval from './panel/autoplay-interval'
export default {
  name: 'lego-slider',
  props: {
    layout: Props.layout({
      component: pass(Forms.Layout, {
        disable: ['padding', 'border', 'bgColor']
      })
    }),
    loop: Props.custom({
      default: true,
      component: Loop
    }),
    autoplay: Props.custom({
      default: false,
      component: AutoPlay
    }),
    interval: Props.custom({
      default: 2000,
      component: AutoPlayInterval
    }),
    images: Props.custom({
      default: [],
      component: Panel
    })
  },
  computed: {
    moduleStyle () {
      return Props.genStyles(this.layout, { removeTranslate: true })
    },
    styles () {
      return this.images.map(x => Props.genStyles(x))
    }
  },
  watch: {
    interval (newV) {
      console.log('new', newV)
    }
  }
}
</script>

<style lang="scss" scoped>
.lego-slider {
  background: #f2f2f2;

  .lego-slider-item {
    width: 100%;
    height: auto;
  }
}
</style>
