<template>
  <div class="config-item-segment">
    <header>左侧标题</header>
    <base-text v-model="v.left.title" />
    <header>左侧描述</header>
    <styled-text v-model="v.left.description" />
    <header>左侧图片</header>
    <styled-image v-model="v.left.url" />

    <header>右侧标题</header>
    <base-text v-model="v.right.title" />
    <header>右侧描述</header>
    <styled-text v-model="v.right.description" />
    <header>右侧图片</header>
    <styled-image v-model="v.right.url" />
  </div>
</template>

<script>
import Forms from '@/forms'
export default {
  props: ['value', 'props'],
  data () {
    return {
      v: this.value
    }
  },
  watch: {
    v: {
      deep: true,
      handler (newValue) {
        this.$emit('change', newValue)
      }
    }
  },
  components: {
    BaseText: Forms.BaseText,
    StyledText: Forms.StyledText,
    StyledImage: Forms.StyledImage
  }
}
</script>

<style lang="scss" scoped></style>
