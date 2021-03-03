<template>
  <div class="test-dynamic-form">
    <form-header />
    <div class="form-sub-title">
      {{ subTitle }}
    </div>
    <form-content />
  </div>
</template>

<script>
import Props from '@/modules/props'
import FormHeader from './form-header'
import FormContent from './form-content'
export default {
  name: 'test-dynamic-form',
  props: {
    subTitle: Props.string({
      label: '表单副标题',
      default: 'a dynamic form for test',
      maxlength: 20,
      showWordLimit: true,
    }),
  },
  components: {
    FormHeader,
    FormContent,
  },
  watch: {
    subTitle(n) {
      console.log('subTitle changed: ', n)
    },
  },
}
</script>

<style lang="scss" scoped>
.test-dynamic-form {
  padding: 15px;
  background: #5200d1;
}
.form-sub-title {
  margin: 15px 0;
  font-size: 12px;
  color: #f0f3f7;
  text-align: center;
}
</style>
