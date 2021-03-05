<template>
  <div class="lego-image">
    <img :src="url" />
  </div>
</template>

<script>
import Props from '../props'
export default {
  name: 'lego-image',
  props: {
    url: Props.string({
      label: '图片地址',
      default: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/spark.png',
      required: true,
      showWordLimit: true,
      validator(value) {
        if (value.length == 0) {
          return '请填写图片链接'
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.lego-image {
  word-break: break-all;
  white-space: break-spaces;

  & > img {
    width: 100%;
    height: auto;
  }
}
</style>
