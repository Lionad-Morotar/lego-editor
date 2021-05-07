<template>
  <el-carousel
    class="lego-slider"
    arrow="never"
    :height="'200px'"
    :loop="loop"
    :autoplay="autoplay"
    :interval="interval"
    :indicator-position="indicator ? '' : 'none'"
    :style="moduleStyle">
    <el-carousel-item
      v-for="(image, idx) in images"
      :key="image.url+idx">
      <div class="clip-rect">
        <img
          class="lego-slider-item"
          :src="image.url"
          :style="styles[idx]"
        />
      </div>
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
import Indicator from './panel/indicator'
export default {
  name: 'lego-slider',
  props: {
    layout: Props.layout({
      component: pass(Forms.Layout, {
        disable: ['padding', 'border', 'bgColor']
      }),
      default: {
        lockLayout: true
      }
    }),
    indicator: Props.custom({
      component: Indicator,
      default: true
    }),
    loop: Props.custom({
      component: Loop,
      default: true
    }),
    autoplay: Props.custom({
      component: AutoPlay,
      default: false
    }),
    interval: Props.custom({
      component: AutoPlayInterval,
      default: 2000
    }),
    images: Props.custom({
      component: Panel,
      default: [
        Props.merge(Props.DS.image, {
          url: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/slider/default.png'
        })
      ]
    })
  },
  computed: {
    moduleStyle () {
      return Props.genStyles(this.layout, { removeTranslate: true })
    },
    styles () {
      return this.images.map(x =>
        Props.genStyles({
          ...x,
          width: 375
        })
      )
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
