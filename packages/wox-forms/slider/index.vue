<template>
  <div class="slider-con">
    <el-slider
      v-model="v"
      class="slider"
      :show-tooltip="false"
      v-bind="$attrs"
    />
    <span class="slider-des">{{v}}</span>
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
