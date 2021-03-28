<template>
  <div class="config-item" v-if="props.images.length > 1 && props.autoplay">
    <div class="config-item-header">时间间隔</div>
    <div class="config-item-content">
      <base-slider
        v-model="v"
        :min="500"
        :max="5000"
        :step="500"
      />
    </div>
  </div>
</template>

<script>
import Forms from '@/forms'
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
    BaseSlider: Forms.BaseSlider
  }
}
</script>
