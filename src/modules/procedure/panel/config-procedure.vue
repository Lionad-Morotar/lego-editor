<template>
  <div class="config-item-segment">
    <!-- <header>{{ v.title }}</header> -->
    <header>流程名称</header>
    <base-text v-model="v.title" />
    <header>流程图片</header>
    <styled-image v-model="v.image" v-bind="options" />
    <header>流程内容</header>
    <base-textarea v-model="v.content" />
  </div>
</template>

<script>
import Forms from '@/forms'
export default {
  props: ['value', 'props'],
  data () {
    return {
      v: this.value,
      options: {
        width: 165,
        height: 122
      }
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
    BaseTextarea: Forms.BaseTextarea,
    StyledImage: Forms.StyledImage
  }
}
</script>

<style lang="scss" scoped>
.header {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.4px;
}
</style>
