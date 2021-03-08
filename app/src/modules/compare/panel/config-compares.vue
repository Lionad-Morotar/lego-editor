<template>
  <fragment>
    <div v-for="idx in props.counts" :key="idx">
      <div class="label">左侧标题</div>
      <base-text v-model="v[idx-1].left.title" />
      <div class="label">左侧描述</div>
      <styled-text v-model="v[idx-1].left.description" />
      <div class="label">左侧图片</div>
      <styled-image v-model="v[idx-1].left.url" />
      <div class="label">右侧标题</div>
      <base-text v-model="v[idx-1].right.title" />
      <div class="label">右侧描述</div>
      <styled-text v-model="v[idx-1].right.description" />
      <div class="label">右侧图片</div>
      <styled-image v-model="v[idx-1].right.url" />
    </div>
  </fragment>
</template>

<script>
import Forms from '../../forms'
export default {
  name: 'compare',
  props: ['value', 'props'],
  data() {
    return {
      v: this.value,
    }
  },
  watch: {
    v: {
      deep: true,
      handler(newValue) {
        this.$emit('change', newValue)
      },
    },
  },
  components: {
    BaseText: Forms.BaseText,
    StyledText: Forms.StyledText,
    StyledImage: Forms.StyledImage,
  }
}
</script>

<style lang="scss" scoped>
</style>
