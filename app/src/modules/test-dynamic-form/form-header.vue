<template>
  <h4 :style="styles">{{ formName.text }}</h4>
</template>

<script>
import Props from '../props'
export default {
  props: {
    formName: Props.text({
      label: '表单名称',
      default: {
        text: '动态表单',
        textAlign: 'center'
      },
      placeholder: '请填写表单名称',
      required: true,
      maxlength: 10,
      showWordLimit: true,
    }),
  },
  computed: {
    styles () {
      return Props.genStyles(this.formName)
    }
  },
}
</script>

<style lang="scss" scoped>
h4 {
  margin: 10px;
  font-size: 24px;
  color: white;
  font-weight: 300;
  letter-spacing: 1px;
}
</style>
