<template>
  <div class="m-text" :style="styles">{{ text.text }}</div>
</template>

<script>
import Props from 'wox-props'
export default {
  name: 'm-text',
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
