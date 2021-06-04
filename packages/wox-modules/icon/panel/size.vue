<template>
  <div class="config-item">
    <div class="config-item-label">边框尺寸</div>
    <div class="config-item-content">
      <forms-slider
        v-model="valueHeight"
        :min="minHeight"
        :max="maxHeight"
        :step="1"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'props'],
  computed: {
    minHeight () {
      return 30
    },
    maxHeight () {
      return 100
    },
    valueHeight: {
      get () {
        return this.value.height
      },
      set (val) {
        const value = this._.cloneDeep(this.value)
        value.width = val
        value.height = val
        value.fontSize = Math.min(value.fontSize, val)
        this.$emit('change', value)
      }
    }
  }
}
</script>
