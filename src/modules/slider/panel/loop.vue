<template>
  <div class="config-item" v-if="canShow">
    <div class="config-item-header">循环播放</div>
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
  computed: {
    canShow () {
      return this.props?.images?.length > 1
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
