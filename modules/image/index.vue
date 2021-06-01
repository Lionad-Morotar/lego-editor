<template>
  <div class="m-image clip-rect">
    <img :src="image.url" :style="styles" />
  </div>
</template>

<script>
import Props from '@/models/props'
export default {
  name: 'm-image',
  props: {
    layout: Props.layout({
      component: null
    }),
    image: Props.image({
      label: '图片地址',
      default: {
        url: 'https://lego-editor.oss-cn-shanghai.aliyuncs.com/images/default.png',
        points: [0, 0, 375, 251]
      }
    })
  },
  computed: {
    styles () {
      return Props.genStyles({
        ...this.image,
        width: this.layout.width
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.m-image {
  line-height: 0;

  & > img {
    width: 100%;
    height: auto;
    image-rendering: -webkit-optimize-contrast;
  }
}
</style>
