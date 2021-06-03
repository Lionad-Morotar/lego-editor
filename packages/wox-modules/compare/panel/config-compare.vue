<template>
  <div class="config-item-segment">
    <header>左侧标题</header>
    <forms-string v-model="v.left.title" />
    <header>左侧描述</header>
    <forms-text v-model="v.left.description" />
    <header>左侧图片</header>
    <forms-image v-model="v.left.image" v-bind="options" />

    <header>右侧标题</header>
    <forms-string v-model="v.right.title" />
    <header>右侧描述</header>
    <forms-text v-model="v.right.description" />
    <header>右侧图片</header>
    <forms-image v-model="v.right.image" v-bind="options" />
  </div>
</template>

<script>
export default {
  props: ['value', 'props'],
  data () {
    return {
      v: this.value,
      options: {
        width: 140,
        height: 84
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

<style lang="scss" scoped></style>
