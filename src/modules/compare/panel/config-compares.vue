<template>
  <div>
    <div v-for="(compare, idx) in value" :key="idx">
      <div class="label">左侧标题</div>
      <base-text v-model="compare.left.title" />
      <div class="label">左侧描述</div>
      <styled-text v-model="compare.left.description" />
      <div class="label">左侧图片</div>
      <styled-image v-model="compare.left.url" />
      <hr />
      <div class="label">右侧标题</div>
      <base-text v-model="compare.right.title" />
      <div class="label">右侧描述</div>
      <styled-text v-model="compare.right.description" />
      <div class="label">右侧图片</div>
      <styled-image v-model="compare.right.url" />
    </div>
  </div>
</template>

<script>
import Forms from '../../forms'
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
