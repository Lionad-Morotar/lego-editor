<template>
  <div class="test-dynamic-form">
    <h3 :style="styles.title">{{ title.text }}</h3>
    <div class="form-sub-title" :style="styles.subTitle">
      {{ subTitle.text }}
    </div>
    <form-content />
  </div>
</template>

<script>
import Props from '../props'
import FormContent from './form-content'
export default {
  name: 'test-dynamic-form',
  props: {
    title: Props.text({
      label: '表单名称',
      default: {
        text: '测试表单',
        textAlign: 'center',
        bold: true
      },
      placeholder: '请填写表单名称',
      required: true,
      maxlength: 10,
      showWordLimit: true,
    }),
    subTitle: Props.text({
      label: '表单副标题',
      default: {
        text: 'a dynamic form for test',
        textAlign: 'center',
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
    styles() {
      return {
        title: Props.genStyles(this.title),
        subTitle: Props.genStyles(this.subTitle),
      }
    },
  },
  components: {
    FormContent,
  },
}
</script>

<style lang="scss" scoped>
.test-dynamic-form {
  padding: 15px;
  background: #5200d1;
}
h3 {
  margin: 10px;
  font-size: 24px;
  color: white;
  font-weight: 300;
  letter-spacing: 1px;
}
.form-sub-title {
  padding: 5px 0 15px 0;
  font-size: 12px;
  color: #f0f3f7;
  text-align: center;
}
</style>
