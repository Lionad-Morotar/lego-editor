<template>
  <div>
    <div v-for="(compare, idx) in value" :key="idx">
      <div class="label">左侧标题</div>
      <forms-string v-model="compare.left.title" />
      <div class="label">左侧描述</div>
      <forms-text v-model="compare.left.description" />
      <div class="label">左侧图片</div>
      <forms-image v-model="compare.left.url" />
      <hr />
      <div class="label">右侧标题</div>
      <forms-string v-model="compare.right.title" />
      <div class="label">右侧描述</div>
      <forms-text v-model="compare.right.description" />
      <div class="label">右侧图片</div>
      <forms-image v-model="compare.right.url" />
    </div>
  </div>
</template>

<script>
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
  }
}
</script>
