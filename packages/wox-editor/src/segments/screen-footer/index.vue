<template>
  <div class="footer">
    <helper />
  </div>
</template>

<script>
import Helper from './helper/index'

export default {
  components: {
    Helper
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  bottom: 0;
  right: 0;
}
</style>
