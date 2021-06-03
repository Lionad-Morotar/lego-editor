<template>
  <div class="config-item">
    <div class="config-item-label">分割线</div>
    <div class="config-item-content">
      <el-switch :value="value" @change="v => $emit('change', v)" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['value']
}
</script>
