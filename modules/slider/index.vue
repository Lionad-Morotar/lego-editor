<template>
  <el-carousel
    class="m-slider"
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
          class="m-slider-item"
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
import { pass } from 'modules/utils'
import Panel from './panel/index'
import AutoPlayInterval from './panel/autoplay-interval'
export default {
  name: 'm-slider',
  props: {
    layout: Props.layout({
      component: pass(Forms.Layout, {
        disable: ['padding', 'border', 'bgColor']
      }),
      default: {
        lockLayout: true
      }
    }),
    indicator: Props.bool({
      label: '指示器',
      default: true
    }),
    loop: Props.bool({
      label: '循环播放',
      default: true
    }),
    autoplay: Props.bool({
      label: '自动播放',
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
.m-slider {
  background: #f2f2f2;

  .m-slider-item {
    width: 100%;
    height: auto;
  }
}
</style>
