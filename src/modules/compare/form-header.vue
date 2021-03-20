<template>
  <fragment>
    <h3 :style="styles.title">{{ title.text }}</h3>
    <h4 :style="styles.subTitle">{{ subTitle.text }}</h4>
  </fragment>
</template>

<script>
import Props from '../props'
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
      fallback: true,
      placeholder: '请填写表单名称',
      required: true,
      maxlength: 10,
      showWordLimit: true
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
      fallback: true,
      placeholder: '请填写表单副标题',
      required: true,
      maxlength: 25,
      showWordLimit: true
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
