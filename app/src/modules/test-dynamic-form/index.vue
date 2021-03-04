<template>
  <div class="test-dynamic-form">
    <form-header />
    <div class="form-sub-title" :style="styles.subTitle">
      {{ subTitle.text }}
    </div>
    <form-content />
  </div>
</template>

<script>
import Props from '../props'
import FormHeader from './form-header'
import FormContent from './form-content'
export default {
  name: 'test-dynamic-form',
  props: {
    subTitle: Props.text({
      label: '表单副标题',
      default: {
        text: 'a dynamic form for test',
        textAlign: 'center'
      },
      maxlength: 40,
      showWordLimit: true,
      validator({ text }) {
        if (text.length == 0) {
          return '请填写表单副标题'
        }
        if (text.length > 40) {
          return '表单副标题长度上限 40'
        }
      },
    }),
  },
  computed: {
    styles () {
      return {
        subTitle: Props.genStyles(this.subTitle)
      }
    }
  },
  components: {
    FormHeader,
    FormContent,
  },
}
</script>

<style lang="scss" scoped>
.test-dynamic-form {
  padding: 15px;
  background: #5200d1;
}
.form-sub-title {
  padding: 5px 0 15px 0;
  font-size: 12px;
  color: #f0f3f7;
  text-align: center;
}
</style>
