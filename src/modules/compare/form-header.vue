<template>
  <fragment>
    <h3 :style="styles.title">{{ title.text }}</h3>
    <h4 :style="styles.subTitle">{{ subTitle.text }}</h4>
  </fragment>
</template>

<script>
import Props from '@/models/props'
export default {
  props: {
    title: Props.text({
      label: '表单名称',
      default: {
        text: '服务优势',
        textAlign: 'center',
        bold: true,
        fontSize: 28,
        color: '#5200d1',
        letterSpacing: 2
      },
      fallback: true
    }),
    subTitle: Props.text({
      label: '表单副标题',
      default: {
        text: '浩瀚家装和普通家装的对比',
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
        letterSpacing: 0.5
      },
      fallback: true
    })
  },
  computed: {
    styles () {
      return {
        title: Props.genStyles(this.title),
        subTitle: Props.genStyles(this.subTitle)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h3,
h4 {
  display: block;
}
h4 {
  padding-top: 15px;
}
</style>
