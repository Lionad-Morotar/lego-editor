<template>
  <div class="config-item">
    <div class="config-item-header">高度</div>
    <div class="config-item-content">
      <forms-slider
        v-model="v.height"
        :min="5"
        :max="500"
        :step="1"
      />
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
