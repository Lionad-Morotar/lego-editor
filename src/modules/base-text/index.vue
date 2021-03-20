<template>
  <div class="lego-text" :style="styles">{{ text.text }}</div>
</template>

<script>
import Props from '../props'
export default {
  name: 'lego-text',
  props: {
    text: Props.text({
      label: '文本内容',
      default: {
        text: '一行文本'
      }
    })
  },
  computed: {
    styles () {
      return Props.genStyles(this.text)
    }
  }
}
</script>

<style lang="scss" scoped>
.lego-text {
  word-break: break-all;
  white-space: break-spaces;
}
</style>
