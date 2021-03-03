<template>
  <h4>{{ formName }}</h4>
</template>

<script>
import Props from '@/modules/props'
export default {
  props: {
    formName: Props.string({
      label: '表单名称',
      default: '动态表单',
      placeholder: '请填写表单名称',
      required: true,
      maxlength: 10,
      showWordLimit: true,
    }),
  },
  computed: {
    test() {
      console.log('this.formName:', this.formName)
      return this.formName
    },
  },
}
</script>

<style lang="scss" scoped>
h4 {
  margin: 10px;
  font-size: 24px;
  color: white;
  font-weight: 300;
  text-align: center;
  letter-spacing: 1px;
}
</style>
