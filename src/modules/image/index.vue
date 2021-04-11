<template>
  <!-- FIXME 图片重新上传后裁剪问题 -->
  <div class="lego-image clip-rect">
    <img :src="image.url" :style="styles" />
  </div>
</template>

<script>
import Props from '@/models/props'
export default {
  name: 'lego-image',
  props: {
    layout: Props.layout({
      component: null
    }),
    image: Props.image({
      label: '图片地址',
      default: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/image/default.png'
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
.lego-image {
  line-height: 0;

  & > img {
    width: 100%;
    height: auto;
    image-rendering: -webkit-optimize-contrast;
  }
}
</style>
