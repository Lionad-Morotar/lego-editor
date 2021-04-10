<template>
  <div class="config-item-segment">
    <!-- <header>{{ v.title }}</header> -->
    <header>流程名称</header>
    <forms-string v-model="v.title" />
    <header>流程图片</header>
    <forms-image v-model="v.image" v-bind="options" />
    <header>流程内容</header>
    <forms-stringarea v-model="v.content" />
  </div>
</template>

<script>
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
