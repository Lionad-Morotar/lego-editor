<template>
  <div class="config-item" v-if="canShow">
    <div class="config-item-header">时间间隔</div>
    <div class="config-item-content">
      <forms-slider
        :value="value"
        :min="500"
        :max="5000"
        :step="500"
        @change="v => $emit('change', v)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'props'],
  computed: {
    canShow () {
      return this.props?.images?.length > 1 && this.props.autoplay
    }
  }
}
</script>
