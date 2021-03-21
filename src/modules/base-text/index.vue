<template>
  <div class="lego-text" :style="styles">{{ text.text }}</div>
</template>

<script>
import Props from '@/models/props'
export default {
  name: 'lego-text',
  props: {
    text: Props.text({
      label: '文本内容',
      default: {
        text: '文本内容',
        fontSize: 20,
        bold: true,
        lineHeight: 2,
        textAlign: 'center'
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
  white-space: nowrap;
}
</style>
