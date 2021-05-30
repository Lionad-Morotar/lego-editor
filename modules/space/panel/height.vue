<template>
  <div class="config-item">
    <div class="config-item-header">高度</div>
    <div class="config-item-content">
      <forms-slider
        :min="5"
        :max="500"
        :step="1"
        :value="value.height"
        @change="v => value.height = v"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'props']
}
</script>
