<template>
  <div class="config-item">
    <div class="config-item-header">隐藏指示器</div>
    <div class="config-item-content">
      <el-switch v-model="v" />
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
