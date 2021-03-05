<template>
  <!-- 感觉没必要再包这层，直接用 CSS 解决其实也行儿 -->
  <div class="click-capture" @click.capture.stop="_ => _">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.click-capture {
  position: relative;
  pointer-events: none;

  & > *:first-child {
    width: 100%;
  }
}
</style>
