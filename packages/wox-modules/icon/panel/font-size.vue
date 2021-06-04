<template>
  <div class="config-item">
    <div class="config-item-label">图标尺寸</div>
    <div class="config-item-content">
      <forms-slider
        v-model="fontSize"
        :min="12"
        :max="100"
        :step="1"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'props'],
  computed: {
    fontSize: {
      get () {
        return this.value.fontSize
      },
      set (val) {
        const value = this._.cloneDeep(this.value)
        value.fontSize = val
        value.width = Math.max(value.width, val)
        value.height = Math.max(value.height, val)
        this.$emit('change', value)
      }
    }
  }
}
</script>
