<template>
  <div class="config-item">
    <div class="config-item-header">指示器</div>
    <div class="config-item-content">
      <el-switch :value="value" @change="v => $emit('change', v)" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'props']
}
</script>
