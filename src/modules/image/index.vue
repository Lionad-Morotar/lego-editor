<template>
  <div class="lego-image">
    <img :src="image.url" :style="styles" />
  </div>
</template>

<script>
import Props from '@/models/props'
export default {
  name: 'lego-image',
  props: {
    image: Props.image({
      label: '图片地址',
      default: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/image/default.png',
      fallback: true,
      validator ({ url }) {
        if (url.length === 0) {
          return '请填写图片链接'
        }
      }
    })
  },
  computed: {
    styles () {
      return Props.genStyles(this.image)
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
  }
}
</style>
