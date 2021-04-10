<template>
  <div class="config-item" v-if="canShow">
    <div class="config-item-header">自动播放</div>
    <div class="config-item-content">
      <el-switch :value="value" @change="v => $emit('change', v)" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'props'],
  computed: {
    canShow () {
      return this.props?.images?.length > 1
    }
  }
}
</script>
