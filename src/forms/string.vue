<template>
  <div class="config-item">
    <div class="config-item-label">{{ $attrs.label }}</div>
    <div class="config-item-content">
      <el-input v-model="v" spellcheck="false" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  model: {
    prop: 'value',
    event: 'change'
  },
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
