<template>
  <fragment>
    <h3>{{ title }}</h3>
    <div class="hr" />
    <h4>{{ subTitle }}</h4>
  </fragment>
</template>

<script>
import Props from '../props'
export default {
  props: {
    title: Props.string({
      label: '流程名称',
      default: '回收流程',
      placeholder: '请填写流程名称',
      required: true,
      maxlength: 13,
      showWordLimit: true
    }),
    subTitle: Props.string({
      label: '副标题',
      default: '累计成交150万+件，是您最好的选择',
      placeholder: '请填写流程副标题'
    })
  }
}
</script>

<style lang="scss" scoped>
h3,
h4 {
  display: block;
  text-align: center;
  word-break: break-all;
}
h3 {
  font-size: 22px;
  font-weight: bold;
  color: #323232;
  letter-spacing: 2px;
}
.hr {
  margin: 15px auto 0 auto;
  position: relative;
  width: 300px;
  height: 1px;
  background: #f9da9e;
  border-radius: 1px;

  &::after {
    content: '';
    position: absolute;
    top: -1.5px;
    left: calc(50% - 68px);
    width: 135px;
    height: 3px;
    border-radius: 2px;
    background: #f2a539;
  }
}
h4 {
  margin-top: 15px;
  color: #777;
  font-size: 13px;
}
</style>
