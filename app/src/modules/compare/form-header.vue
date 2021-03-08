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
      },
      fallback: true,
      placeholder: '请填写表单名称',
      required: true,
      maxlength: 10,
      showWordLimit: true,
    }),
    subTitle: Props.text({
      label: '表单副标题',
      default: {
        text: '浩瀚家装和普通家装的对比',
        textAlign: 'center',
      },
      fallback: true,
      placeholder: '请填写表单副标题',
      required: true,
      maxlength: 25,
      showWordLimit: true,
    }),
  },
  computed: {
    styles() {
      return {
        title: Props.genStyles(this.title),
        subTitle: Props.genStyles(this.subTitle),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h3,
h4 {
  display: block;
}
h3 {
  padding-top: 20px;
  font-size: 28px;
  color: #5200d1;
  letter-spacing: 2px;
}
h4 {
  padding-top: 15px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #888;
  letter-spacing: 0.5px;
}
</style>
