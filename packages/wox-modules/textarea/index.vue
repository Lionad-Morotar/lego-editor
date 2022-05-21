<template>
  <div class="m-textarea" :style="styles">{{ text.text }}</div>
</template>

<script>
import Props from 'wox-props'
export default {
  name: 'm-textarea',
  props: {
    layout: Props.layout(),
    text: Props.textarea({
      label: '文本内容',
      default: {
        text: 'Officia fugiat cillum officia ullamco voluptate tempor pariatur irure cupidatat nisi incididunt proident irure. Voluptate cillum ullamco ea occaecat veniam ullamco reprehenderit labore adipisicing sint ea.',
        wrap: true,
        fontSize: 12,
        lineHeight: 1.6,
        color: '#666'
      }
    })
  },
  computed: {
    styles () {
      return {
        ...Props.genStyles(this.layout, { removeTranslate: true }),
        ...Props.genStyles(this.text)
      }
    }
  }
}
</script>
